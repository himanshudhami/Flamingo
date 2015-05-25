module.exports = {
    APP_URL: 'http://localhost',
    EMAIL_SECRET: 'somethingsecret',
    SMTP_SERVICE: 'Gmail',
    SMTP_USERNAME: 'rahuldabong@gmail.com',
    SMTP_PASSWORD: 'karate69',
    amqp: {
        host: 'localhost',
        vhost: '/',
        'flamingo-topic-exchange': 'flamingo-api',
        login: 'guest',
        password: 'guest',
        authMechanism: 'AMQPLAIN',
        broker: 'amqp://guest:guest@localhost',
        exchange: 'flamingo-api',
        replyTimeout: 60000
    },
    flamingoMS: {
    	timeout: 30000,
		  sales: {
		  	get: 'flamingo.sales.get',
		  	post: 'flamingo.sales.set'
		  },
		  products: {
		  	get: 'flamingo.products.get'
		  }
    }
};
