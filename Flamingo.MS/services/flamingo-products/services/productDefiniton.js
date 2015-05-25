'use strict';

var definition = require('../models/product.js');
module.exports = {
  routeKey: 'flamingo.products.definition',
  handler: function(messageContext) {
      console.log('messageContext:reply',messageContext.reply)
      messageContext.reply(definition);
    }
}