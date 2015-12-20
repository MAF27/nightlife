var app = require('angular')
	.module('nightlife');
var yelp = require("node-yelp");
var biz = require('../services/mockbern.js');
var util = require('../lib/util');

app.controller('ListingCtrl', ListingCtrl);

ListingCtrl.$inject = ['$scope', 'api', '$location', '$http', '$rootScope'];

function ListingCtrl($scope, api, $location, $http, $rootScope) {

	// $scope.restaurants = biz; // MOCKING
	$http.get('/api/get-user/')
		.then(function(user) {
			$rootScope.user = user.data;
		});

	$scope.submitSearch = function() {
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
				terms: "bars",
				location: $scope.location
			})
			.then(function(data) {
				console.log(data.businesses);
				$scope.restaurants = data.businesses;
				$scope.$apply();
				// Populate people going, if logged in
				$scope.setGoings();
			});
		// util.getRestForLoc($scope.location)
		// 	.then(function(r) {
		// 		$rootScope.restaurants = r;
		// 	});
	};

	$scope.handleButton = function(restaurant) {
		// If current user is going, delete going
		if (restaurant.currentGoing) {
			return $http.delete('/api/going/', {
					params: {
						rest_id: restaurant.id,
						user_id: $rootScope.user._id
					}
				})
				.then(function() {
					restaurant.currentGoing = false; // Mark here to update view
					return $http.get('/api/get-goings/' + restaurant.id);
				})
				.then($scope._setG);
		} else {
			// Current user is not going, add going
			var p = {
				rest_id: restaurant.id,
				user_id: $rootScope.user._id,
				user_firstName: $rootScope.user.firstName,
				user_lastName: $rootScope.user.lastName
			};
			return $http.post('/api/going/', p)
				.then(function() {
					return $http.get('/api/get-goings/' + restaurant.id);
				})
				.then($scope._setG);
		} // else
	};

	$scope._setG = function(goings) {
		if (goings.data.length > 0) {
			// Find index of restaurant being added to
			var el = util.getElement(goings.data[0].rest_id, $scope.restaurants);
			var fCurrentGoing = false;
			// Initialize array for people going
			$scope.restaurants[el].goings = [];
			// Find people going and insert them into array
			for (var i = 0; i < goings.data.length; i++) {
				// Set flag if current user is going
				if ($rootScope.user && goings.data[i].user_id === $rootScope.user._id) {
					fCurrentGoing = true;
				} else {
					// Otherwise add name of others to array
					$scope.restaurants[el].goings.push({
						user_id: goings.data[i].user_id,
						user_firstName: goings.data[i].user_firstName,
						user_lastName: goings.data[i].user_lastName
					});
				} // else
			} // for
			$scope.restaurants[el].currentGoing = fCurrentGoing;
		}
	};

	$scope.setGoings = function() {
		if ($rootScope.user) {
			for (var i = 0; i < $scope.restaurants.length; i++) {
				// Have to do this on this level, _setG does not know which element if no qoings are found
				$http.get('/api/get-goings/' + $scope.restaurants[i].id)
					.then($scope._setG);
			} // for
			$scope.$apply();
		}
	};

	$scope.goNotGo = function(restaurant) {
		if (restaurant.currentGoing) {
			return "Don't Go";
		} else return 'Go';
	};

	$scope.showGoings = function(restaurant) {
		var goings = restaurant.goings;
		var fCurrentGoing = restaurant.currentGoing ? true : false;
		return util.parseGoings(goings, fCurrentGoing);
	};

	$scope.showAll = function(restaurant) {
		var s = '';
		var l = restaurant.goings.length;
		for (var i = 0; i < l; i++) {
			s += restaurant.goings[i].user_firstName + ' ' + restaurant.goings[i].user_lastName;
			s += (i < (l - 1)) ? ', ' : '';
		}
		return s;
	};
}
