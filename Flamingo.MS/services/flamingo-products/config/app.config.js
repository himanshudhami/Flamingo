'use strict';

module.exports = {
	mongo: 'mongodb://localhost',
  mongoPath: 'products',
	amqp: {
    host: 'localhost',
    vhost: '/',
    'flamingo-topic-exchange': 'flamingo-api',
    broker: 'amqp://guest:guest@localhost'
  },
  broker: 'amqp://guest:guest@localhost'
}