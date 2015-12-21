var angular = require('angular');

var app = angular.module('nightlife', [require('angular-route'), require('angular-cookies')])
	.run(function($rootScope, $http) {
		$http.get('/api/get-user')
			.then(function(userobj) {
				$rootScope.userobj = userobj;
			});
	});

require('./controllers');
require('./lib');
require('./models');
require('./services');
