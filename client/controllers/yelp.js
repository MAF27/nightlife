var app = angular.module('nightlife');

app.controller('yelpController', ['$scope', '$resource', function($scope, $resource) {
	// var Meetup = $resource('/api/meetups');
	var yelp = require("node-yelp");

	var client = yelp.createClient({
		oauth: {
			consumer_key: '6SZMMg4wFSxn1xo3wBP8AQ',
			consumer_secret: 'BpZKq_rIQAL9upKUcAEpwsk0v9s',
			token: 'dDmM1PHNtnwDS8Xw4ozmLydtLctCZYC9',
			token_secret: 'nGdxlxllpfmaB5WrwGTI6qhUE3c',
		},

		// Optional settings:
		httpClient: {
			maxSockets: 25 // ~> Default is 10
		}
	});

	client.search({
			terms: "restaurants",
			location: "Zurich"
		})
		.then(function(data) {
			console.log(data.businesses);
			$scope.quak = 'Es ist zum Quaken';
			$scope.restaurants = data.businesses;
			$scope.$apply();
		});

		$scope.authenticate = function() {
			console.log('Auth');
			passport.authenticate('twitter');
		};

}]);
