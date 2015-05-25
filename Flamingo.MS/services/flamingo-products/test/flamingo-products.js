'use strict';

var mongoose = require('mongoose'), FlamingoProduct;
var q = require('q');
var _ = require('lodash');
var db;

module.exports.connect = function(){
	mongoose.connect(config.mongoUrl);
	db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	var productSchema = mongoose.Schema({
		productDetails: { type: [String], index: true },
		name: String,
		dateModified: { type: Date, default: Date.now },
		modifiedBy: String,
		productId: Number,
		productDesc: String
	});
	FlamingoProduct = mongoose.model('FlamingoProduct', productSchema);
};
module.exports.save = function(flamingoProduct){
	var deferred = q.defer();
	var product = new FlamingoProduct(flamingoProduct);
	product.save(function (err, access){
		if(err){
			return deferred.reject(err);
		} else
			deferred.resolve(product.id);
	});
	return deferred.promise;
}

module.exports.find = function(name,id,allNamed){
	var deferred = q.defer();
	
	var filter = {};
	if(name){
		filter.name = name;
	} 
	if(id){
		filter._id = id;
	}
	if(allNamed){
		filter.name = { $exists: true };
	}
	console.log(filter);
	FlamingoProduct.find(filter,function(err, levels){
		if(err){
			console.log('product.find.err',err);
			return deferred.reject(err);
		}
		deferred.resolve(_.map(levels,function(level){return level._doc; }));
	});
	return deferred.promise;
}

module.exports.update = function(product){
	var deferred = q.defer();
	var id = product._id;
	delete product._id;
	var property,updateEntity = {};
	var update = new FlamingoProduct(product).toObject();
	for (property in update){
		console.log('property',property);
		if(property !== '_id')
			updateEntity[property] = update[property];
	}
	console.log(JSON.stringify(updateEntity,null,4));
	FlamingoProduct.update({ _id: id }, updateEntity, function(err, numberAffected, raw){
		if(err){
			deferred.reject(err);
		} else {
			deferred.resolve(raw);
		}
	});
	return deferred.promise;
}