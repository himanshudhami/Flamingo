'use strict';

module.exports = {
	mongoUrl: 'mongodb://localhost/products',
	amqp: {
    host: 'localhost',
    vhost: '/',
    'flamingo-topic-exchange': 'flamingo-api',
    broker: 'amqp://guest:guest@localhost'
  },
  broker: 'amqp://guest:guest@localhost'
}