'use strict';

var exchangeName = config.get('amqp:flamingo-topic-exchange');
var microservices = require('medseek-util-microservices');
var data = require('../data/flamingo-products');
data.connect();

microservices.useTransport(microservices.AmqpTransport, {
    defaultExchange: 'topic://' + exchangeName,
    broker: config.get('broker')
  });


module.exports = function(service){
	var uri = 'topic://' + exchangeName + '/' + service.routeKey + '/' + service.routeKey;
	util.log(uri);
	microservices
    .bind(uri, service.handler);
}