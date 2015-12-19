var app = require('angular')
	.module('nightlife');
var biz = require('../services/mock.js');

app.controller('ListingCtrl', ListingCtrl);

ListingCtrl.$inject = ['$scope', 'api', '$location'];

function ListingCtrl($scope, api, $location) {
	var yelp = require("node-yelp");

	$scope.restaurants = biz;

	api.getUser()
		.then(function(user) {
			$scope.user = user.user;
		});

	/*
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

		console.log('* Client created, searching ...');
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
	*/
}
