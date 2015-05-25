'use strict';

var config = require('./config');

exports.getAmqpOptions = function(req, routeKey, postData){
	var authHeader = req.headers.authorization;
	var sessionIdParts = authHeader ? authHeader.split(' ') : '';
	return {
		exchange: config.amqp['flamingo-topic-exchange'],
		queueName: config.amqp.queueName,
		routeKey: routeKey,
		body: postData || '',
		headers: {
			'session-id':  sessionIdParts.length === 2 ? sessionIdParts[1] : '',
			ip: req.ip,
		}
	};
};
