'use strict';

var mongo = require('mongoose');
var config = require('../config/app.config'), db, Sale;
var q = require('q');

module.exports.connect = function(){
	mongo.connect(config.mongoUrl);
	db = mongo.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	var salesSchema = mongo.Schema({
		id: Number,		
		productId: Number,
		userId: String,
		quantity: Number,
		salesDate: { type: Date, default: Date.now }
	});
	Sale = mongo.model('Sale', salesSchema);
	var ipadSale = new Sale({
		id: 1,
		productId: 1,
		userId: 'sambaranr@gmail.com',
		quantity: 1
	});
	ipadSale.save(function (err, newSale){
		if(err){
			console.log(err);
		} else
			console.log(newSale.id);
	});
	var ipadSale2 = new Sale({
		id: 2,
		productId: 2,
		userId: 'sambaranr@gmail.com',
		quantity: 3
	});
	ipadSale2.save(function (err, newSale){
		if(err){
			console.log(err);
		} else
			console.log(newSale.id);
	});
	var ipadSale3 = new Sale({
		id: 3,
		productId: 3,
		userId: 'sambaranr@gmail.com',
		quantity: 2
	});
	ipadSale3.save(function (err, newSale){
		if(err){
			console.log(err);
		} else
			console.log(newSale.id);
	});		
};

module.exports.save = function(sale){
	var deferred = q.defer();
	var newItem = new Sale(sale);
	newItem.save(function (err, newSale){
		if(err){
			return deferred.reject(err);
		} else
			deferred.resolve(newSale.id);
	});
	return deferred.promise;
};

module.exports.find = function(id) {
	var deferred = q.defer();
	if(id){
		Sale.find({_id:id},function(err, sale){
			deferred.resolve(sale);
		});
	} else {
		Sale.find(function(err, sales) {
			deferred.resolve(sales);
		});
	}
	return deferred.promise;
};

module.exports.update = function(sale, id) {
	var deferred = q.defer();
	Sale.update({ _id: id }, sale, function(err, numberAffected, raw){
		if(err){
			deferred.reject(err);
		} else {
			deferred.resolve(id);
		}
	});
	return deferred.promise;
};
