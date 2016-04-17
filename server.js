var americano = require('americano');

var cozydb = require('cozydb');

/*
    CouchDB views initialization. It must be done before starting the server.
*/
cozydb.configure(__dirname, null, function() {

	var options = {
		name: 'SimpleNote',
		root: __dirname,
		port: process.env.PORT || 9250,
		host: process.env.HOST || '127.0.0.1',
	};
	
	americano.start(options, function () {
		console.log('Cozy Simple note listenning at http://%s:%s', options.host, options.port);
	});

});
