'use strict';

var dataStore = require('./app/dataStore');
var serviceUtil = require('./app/service');
var fs = require('fs');

/* connect to mongodb */
dataStore.connect();
var servicePath = __dirname + '/app/microservices';

var files = fs.readdirSync(servicePath);
files.forEach(function(item) {
	var filePath = servicePath +  '/' + item;
	console.log('Adding microservices resource : ' + filePath);
	var serviceDefinition = require(filePath);
	
	/* bind service to topic exchange */
	serviceUtil.register(serviceDefinition);
});