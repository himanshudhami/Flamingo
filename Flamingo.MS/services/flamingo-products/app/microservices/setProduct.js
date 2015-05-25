'use strict';

var store = require('../dataStore');
var q = require('q');

module.exports = {
	action: function(data) {
		if(data._id){
			var productId = data._id;
			delete data._id;				
			return store.update(data, productId);
		} else {
			return store.save(data);
		}
	},
	routeKey: 'flamingo.products.set'
};