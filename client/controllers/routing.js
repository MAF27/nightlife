var app = require('angular').module('nightlife');

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	otherwise({
			templateUrl: '/views/listing.html',
			controller: 'ListingCtrl',
			controllerAs: 'vm'
		})
		.when('/listing', {
			templateUrl: '/views/listing.html',
			controller: 'ListingCtrl',
			controllerAs: 'vm'
		});
		}]);
