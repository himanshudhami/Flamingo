'use strict';

var store = require('../dataStore');
var q = require('q');
var _ = require('lodash');

module.exports = {
	action: function(req) {
		var id = (req.id || (typeof req === 'string' ? req : '')).replace(/\"/g,'');
		var deferred = q.defer();

		store.find(id)
			.then(function(product){
				deferred.resolve(product);
			}).fail(function(err){
				deferred.resolve(err);
			});
			
		return deferred.promise;
	},
	routeKey: 'flamingo.products.get'
};