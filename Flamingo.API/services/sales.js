var jwt = require('jwt-simple');
var translator = require('./flamingoMSTranslator');
var config = require('./config');
var dispatcher = require('./amqpDispatcher');

module.exports = {
	getSales: function (req, res) {
		var token = req.headers.authorization.split(' ')[1];
		var payload = jwt.decode(token, "shhh..");

		if (!payload.sub) {
			res.status(401).send({
				message: 'Authentication failed'
			});
		}

		if (!req.headers.authorization) {
			return res.status(401).send({
				message: 'You are not authorized'
			});
		}
		var path = config.flamingoMS.sales.get;
		var amqpRequest =  translator.getAmqpOptions(req, path, req.body);
		var responsePromise = dispatcher.dispatch(amqpRequest, amqpRequest.body, res);
	  return responsePromise.then(function (result) {
	    return res.json(result);
	  });	
	},
  postSales: function (req, res) {
		var token = req.headers.authorization.split(' ')[1];
		var payload = jwt.decode(token, "shhh..");

		if (!payload.sub) {
			res.status(401).send({
				message: 'Authentication failed'
			});
		}

		if (!req.headers.authorization) {
			return res.status(401).send({
				message: 'You are not authorized'
			});
		}
		var path = config.flamingoMS.sales.post;
		var amqpRequest =  translator.getAmqpOptions(req, path, req.body);
		var responsePromise = dispatcher.dispatch(amqpRequest, amqpRequest.body, res);
	  return responsePromise.then(function (result) {
	    return res.status(201).json(result);
	  });	
	}
}