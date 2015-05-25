'use strict';

var
  amqp = require('amqp'),
  amqplib = require('amqplib'),
  parseForError = require('./errorParser'),
  _ = require('lodash'),
  q = require('q'),
  uuid = require('node-uuid'),
  config = require('./config'),
  timeout = config.flamingoMS.timeout,
  topicExchange = 'topic://' + config.amqp['flamingo-topic-exchange'],
  amqplibConnection,
  amqplibChannel,
  connection,
  exchange,
  uri = require('url');
var microservices = require('./microservices.js');

var normalizeName = function(name) {
  return name.replace(':','_');
};

module.exports.dispatch = dispatch;

function dispatch(requestOptions, message, response, oneWay) {
  return q(microservices.readyPromise).then(function(microservices) {

  if (oneWay) {
    return doSend(microservices);
  }

  var def = q.defer();
  return microservices
    .bindReply(function(messageContext) {
      try {
        var body = messageContext.deserialize();
        parseForError(body);
        if (response && typeof response.set === 'function')
          _.forEach(messageContext.properties, function(value, key) {
            if (response.set && value)
              response.set(key, value);
          });
        def.resolve(body);
      }
      catch (error) {
        def.reject(error);
      }
    })
    .then(function(replyContext) {
      return doSend(replyContext)
        .thenResolve(def.promise)
        .timeout(timeout)
        .finally(replyContext.close);
    });

  function doSend(sender) {
    var address = topicExchange + '/' + requestOptions.routeKey;
    var body = requestOptions.body || {};
    var properties = requestOptions.headers;
     return q(sender.send(address, body, properties));
  }
  });
}

var publishToTopicExchangeAndConsumeReplyMS = function(exchange, message, deferred, routeKey, headers) {
  var queueName = 'flamingo.amqpdispatcher.' + uuid.v1();
  var exchangeName  = exchange.name;
  var channel = amqplibChannel;
  var bindingKey = 'flamingo.amqpdispatcher.' + uuid.v1();
  var replyToTemp = 'topic://' + exchange.name + '/' + bindingKey;
  var contentType = (headers && headers.contentType) ? headers.contentType : 'application/json';
  var options = {
    replyTo: replyToTemp,
    contentType: contentType,
    contentEncoding: 'UTF-8',
    headers: headers || {}
  };
  channel.assertQueue(queueName)
  .then(function() {
    return channel.assertExchange(exchangeName, 'topic', { durable:false });
  })
  .then(function() {
    return channel.bindQueue(queueName, exchangeName, bindingKey);
  })
  .then(function() {
    channel.consume(queueName, function(msg) {
      if (msg !== null) {
        if (msg.properties && msg.properties.contentType === 'application/xml') {
          parseString(msg.content.toString(), {tagNameProcessors: [normalizeName], attrNameProcessors: [normalizeName]}, function (err, result) {
            deferred.resolve(result);
          });
        }
        else {
          deferred.resolve(JSON.parse(msg.content.toString()));
        }
        channel.ack(msg);
        channel.deleteQueue(queueName);
      }
    });
  }).then(function(){
    if (options.contentType === 'application/json')
      channel.publish(exchangeName, routeKey, new Buffer(JSON.stringify(message)), options);
    else
      channel.publish(exchangeName, routeKey, new Buffer(message), options);
  });
};

var publishToRpcTopicExchangeAndConsumeReply = function(exchange, topic, message, deferred, headers) {
    connection.queue('', {
        exclusive: true,
        closeChannelOnUnsubscribe: true
      }, function(queue) {

        var correlationId = uuid.v1();
        var replyRoutingKey = 'amqpDispatcher.reply.' + correlationId;
        var options = {
            contentType: 'application/json',
            contentEncoding: 'UTF-8',
            correlationId: correlationId,
            headers: headers || {},
            replyTo: 'topic://' + exchange.name + '/' + replyRoutingKey
          };

        logger.debug(' publish: ' + correlationId + ' topic: ' + topic);
        logger.trace('listening to ' + queue.name);

        var ctag;

        queue.bind(exchange, replyRoutingKey, function() {
          queue.subscribe(function(reply) {
            var response;
            if(reply.data !== undefined) {
              response = JSON.parse(reply.data);
            } else {
              response = reply;
            }
            deferred.resolve(response);

            queue.unsubscribe(ctag);
            queue.destroy();
          }).addCallback(function(ok) {
            exchange.publish(topic, message, options, function() {});
            ctag = ok.consumerTag;
          });
        });
      });
  };

exports.dispatchTopicRpc = function(topic, message, headers) {
  var deferred = q.defer();
  publishToRpcTopicExchangeAndConsumeReply(exchange, topic, message, deferred, headers);
  return deferred.promise;
};

var rejectOnError = function(deferred, message, err) {
	var error = new Error(message);
	error.status = 500;
	if (err) {
		error.friendlyMessage = err.friendlyMessage;
		error.stack = err.stack;
	}
	deferred.reject(error);
};

exports.dispatchMicroService = function(requestOptions, message, response, oneWay){
  var deferred = q.defer();
  connection.exchange(requestOptions.exchange, {
    passive: true
  }, function(existingExchange) {
    if (existingExchange) {
      try{
        publishToTopicExchangeAndConsumeReplyMS(existingExchange, message, deferred, requestOptions.routeKey, requestOptions.headers, oneWay, response);
      }catch(err){
        rejectOnError(deferred, err.message, err);
      }
    } else {
      connection.exchange(requestOptions.exchangeName, {
        type: 'topic',
        autoDelete: false,
        confirm: true,
        mandatory: true
      }, function(createdExchange) {
        try{
          publishToTopicExchangeAndConsumeReplyMS(createdExchange, message, deferred, requestOptions.routeKey, requestOptions.headers, oneWay, response);
        }catch(err){
          rejectOnError(deferred, err.message, err);
        }
      });
    }
  });
  return deferred.promise;
};


var publishToExchangeAndConsumeReply = function(exchange, routingKey, message, deferred) {
  connection.queue('', {
    exclusive: true
  }, function(queue) {
    var correlationId = uuid.v1();
    var options = {
        correlationId: correlationId,
        replyTo: queue.name
      };
    exchange.publish(routingKey, message, options, function() {});
    queue.bind('#');
    var ctag;
    queue.subscribe(function(reply) {
      try {
        if (reply === null) {
          reply = {};
        }
        parseForError(reply); //throws if reply body is an error response
        deferred.resolve(reply);
      } catch (err) {
          rejectOnError(deferred, err.message, err);
        }
      queue.unsubscribe(ctag);
      queue.destroy();
    }).addCallback(function(ok) {
      ctag = ok.consumerTag;
    });
  });
};

exports.dispatchRpc = function(routingKey, message) {
  var deferred = q.defer();
  connection.exchange(config.amqp.exchange, { passive: true },
    function(existingExchange) {
      if (existingExchange) {
        publishToExchangeAndConsumeReply(existingExchange, routingKey, message, deferred);
      } else {
        connection.exchange(config.amqp.exchange, {
          type: 'topic',
          autoDelete: false
        }, function(createdExchange) {
          publishToExchangeAndConsumeReply(createdExchange, routingKey, message, deferred);
        });
      }
    });
  return deferred.promise;
};

exports.parseAmqpUri = function(target){
  var parsedUri = uri.parse(target.amqp.broker);
  if (parsedUri.hostname) {
    target.amqp.host = parsedUri.hostname;
  }
  if (parsedUri.auth) {
    var arr = parsedUri.auth.split(':');
    target.amqp.login = arr[0];
    target.amqp.password = arr[1];
  }
  target.amqp.vhost = parsedUri.path || target.amqp.vhost;
};

exports.connect = function() {
  var deferred = q.defer();
  exports.parseAmqpUri(config);
  connection = amqp.createConnection(config.amqp);
  connection.on('ready', function() {
    deferred.resolve('amqp connected to: ' + config.amqp.host + ' ' + config.amqp.vhost);
    exchange = connection.exchange(config.amqp.exchange, { passive: true }, function(exchange) {
      console.log('exchange: ' + exchange.name + ' is open');
    });
  });
  connection.on('error', function(err) {
    deferred.resolve(err);

    connection.end();
  });
  return deferred.promise;
};

exports.disconnect = function() {
  if (connection)
    connection.disconnect();
};

amqplib.connect(config.amqp.broker).then(function(connection) {
  amqplibConnection = connection;
  return connection.createChannel().then(function(channel) {
    amqplibChannel = channel;
  });
})
.then(null, console.warn);