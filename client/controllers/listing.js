var app = require('angular')
	.module('nightlife');
var biz = require('../services/mockbern.js');

app.controller('ListingCtrl', ListingCtrl);

ListingCtrl.$inject = ['$scope', 'api', '$location'];

function ListingCtrl($scope, api, $location) {
	var yelp = require("node-yelp");
	var username;

	$scope.restaurants = biz;
	api.getUser()
		.then(function(user) {
			username = user.user;
			$scope.user = username;
		});

	$scope.saveGoing = function(rest_id, username) {
		console.log('* CLIENT SAVE GOING: ', rest_id, username);
		api.saveGoing(rest_id, username);
	};

	$scope._setG = function(goings) {
		biz[0].goings = goings[0].username;
	};

	$scope.setGoings = function() {
		api.getUser()
			.then(function(user) {
				if (user.user) {
					for (var i = 0; i < biz.length; i++) {
						api.getGoings(biz[i].id)
							.then($scope._setG);
					}
				}

			});
	};

	// Populate people going, if logged in
	$scope.setGoings();
	console.log('* Number of restaurants: ', biz.length);

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
