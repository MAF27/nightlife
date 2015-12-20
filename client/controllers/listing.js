var app = require('angular')
	.module('nightlife');
var biz = require('../services/mockbern.js');
var util = require('../lib/util');

app.controller('ListingCtrl', ListingCtrl);

ListingCtrl.$inject = ['$scope', 'api', '$location', '$http'];

function ListingCtrl($scope, api, $location, $http) {
	var yelp = require("node-yelp");

	$scope.restaurants = biz;
	api.getUser()
		.then(function(userobj) {
			$scope.user = userobj.user;
		});

	$scope.saveGoing = function(rest_id, username) {
		$http.post('/api/save-going/', {
				rest_id: rest_id,
				username: username
			})
			.then(function() {
				return $http.get('/api/get-goings/' + rest_id)
					.then($scope._setG);
			});
	};

	$scope._setG = function(goings) {
		if (goings.data.length > 0) {
			// Find index of restaurant being added to
			var el = util.getElement(goings.data[0].rest_id, biz);
			// Initialize array for people going
			biz[el].goings = [];
			// Find people going and insert them into array
			for (var i = 0; i < goings.data.length; i++) {
				biz[el].goings.push(goings.data[i].username);
			}
		}
	};

	$scope.setGoings = function() {
		api.getUser()
			.then(function(userobj) {
				if (userobj.user) {
					for (var i = 0; i < biz.length; i++) {
						$http.get('/api/get-goings/' + biz[i].id)
							.then($scope._setG);
					}
				}

			});
	};

	// Populate people going, if logged in
	$scope.setGoings();

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
