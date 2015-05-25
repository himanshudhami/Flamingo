'use strict';

var argv = require('minimist')(process.argv);
var _ = require('lodash'),ms;
var services = _.difference(['find','productDefinition'],argv.exclude);

console.log(services)
var microservice = require('./services/service');

_.forEach(services,function(service){
	ms = require('./services/' + service);
	microservice(ms);
});

setInterval(function() {
    process.stdout.write(' \b');
}, 3000);