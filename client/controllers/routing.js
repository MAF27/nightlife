var app = require('angular').module('nightlife');

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	otherwise({
			// console.log('* Default route hit');
			templateUrl: '/views/listing.html',
			controller: 'ListingCtrl',
			controllerAs: 'vm'
		})
		.when('/listing', {
			// console.log('* Listing route hit');
			templateUrl: '/views/listing.html',
			controller: 'ListingCtrl',
			controllerAs: 'vm'
		});
		}]);
