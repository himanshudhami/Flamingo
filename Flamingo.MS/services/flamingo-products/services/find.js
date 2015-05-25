'use strict';

var dao = require('../data/flamingo-products');

module.exports = {
  routeKey: 'flamingo.products.find',
  handler: function(messageContext) {
    var body = messageContext.deserialize();
    dao.find(body.productId, body.name, body.allNamed).then(function(data){
    	console.log(data);
    	messageContext.reply(data);
    });
  }
};