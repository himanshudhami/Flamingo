'use strict';

var mongo = require('mongoose');
var config = require('../config/app.config'), db, Product;
var q = require('q');

module.exports.connect = function(){
	mongo.connect(config.mongoUrl);
	db = mongo.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	var productsSchema = mongo.Schema({
		name: String,
		description: String,
		id: Number,
		details: Object,
		price: Number
	});
	Product = mongo.model('Product', productsSchema);	
};

module.exports.save = function(product){
	var deferred = q.defer();
	var newItem = new Product(product);
	newItem.save(function (err, newProduct){
		if(err){
			return deferred.reject(err);
		} else
			deferred.resolve(newProduct.id);
	});
	return deferred.promise;
};

module.exports.find = function(id) {
	var deferred = q.defer();
	if(id){
		Product.find({_id:id},function(err, product){
			deferred.resolve(product);
		});
	} else {
		Product.find(function(err, products) {
			deferred.resolve(products);
		});
	}
	return deferred.promise;
};

module.exports.update = function(product, id) {
	var deferred = q.defer();
	Product.update({ _id: id }, product, function(err, numberAffected, raw){
		if(err){
			deferred.reject(err);
		} else {
			deferred.resolve(id);
		}
	});
	return deferred.promise;
};
