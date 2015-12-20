	var angular = require('angular');
	console.log('* Initializing angular');

	var app = angular.module('nightlife', [
			require('angular-route')
		]);

	require('./controllers');
	require('./lib');
	require('./models');
	require('./services');
