'use strict';

var store = require('../dataStore');
var q = require('q');

module.exports = {
	action: function(data) {
		if(data._id){
			var salesId = data._id;
			delete data._id;				
			return store.update(data, salesId);
		} else {
			return store.save(data);
		}
	},
	routeKey: 'flamingo.sales.set'
};