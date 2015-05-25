'use strict';

var config = require('../config/app.config'), exchangeName = config.amqp['flamingo-topic-exchange'];
var microservices = require('medseek-util-microservices');

microservices.useTransport(microservices.AmqpTransport, {
    defaultExchange: 'topic://' + exchangeName,
    broker: config.amqp.broker
  });

module.exports.register = function(ops){
    microservices
        .bind('topic://' + exchangeName + '/' + ops.routeKey + '/flamingo.sales', function(messageContext) {
            var body = messageContext.deserialize();
            ops.action(body).then(function(reply){
                messageContext.reply(reply);
              }).catch(function(err){
                messageContext.reply(err);
              });
          });
  };

setInterval(function() {
    //process.stdout.write(' \b');
}, 3000);