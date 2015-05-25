'use strict';

var promiseLib = require('bluebird');
var conf = require('./config');

var q = require('q');

var replyTimeout = conf.amqp.replyTimeout || 30000;
var options = {
    defaultExchange: 'topic://' + conf.amqp['flamingo-topic-exchange'],
    defaultQueue: 'flamingo.microservices',
    defaultTimeout: replyTimeout,
    broker: conf.amqp.broker,
    debug: conf.debug || false
};

var microservices = module.exports = require('medseek-util-microservices')(options);
microservices.useTransport(new microservices.AmqpTransport(options));
microservices.options = options;
microservices.readyPromise = promiseLib.resolve(microservices).delay(3000);

microservices.getReply = function(routingKey, message, optionalKeyIdentifier) {
    
    var key = routingKey.toLowerCase();

    return new promiseLib(function(resolve, reject) {
        return bindMSReply(routingKey, message, options,  resolve, reject);
    });
};


function bindMSReply(routingKey, message, options, resolve, reject) {
    var timeout;

    return microservices.bindReply(function(messageContext, replyContext) {
        try {
            var reply = messageContext.deserialize();
            if (typeof(reply.error) !== 'undefined') {
                return reject(new Error(reply.error));
            }
            return resolve(reply);
        } catch (error) {
            return reject(error);
        } finally {
            clearTimeout(timeout);
            replyContext.close();
        }
    }).then(function(replyContext) {
        var address = options.defaultExchange + '/' + routingKey;
        timeout = setTimeout(function() {
            replyContext.close();
            //return reject(new Error('Timeout while waiting for reply from ' + address));
            return resolve();
        }, replyTimeout);
        replyContext.send(address, message);
    });
}

