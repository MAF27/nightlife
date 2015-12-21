var app = require('angular')
	.module('nightlife');
var yelp = require("node-yelp");
var biz = require('../services/mockbern.js');
var util = require('../lib/util');

app.controller('ListingCtrl', ListingCtrl);

ListingCtrl.$inject = ['$scope', 'api', '$location', '$http', '$rootScope', '$cookies'];

function ListingCtrl($scope, api, $location, $http, $rootScope, $cookies) {

	$scope.submitSearch = function() {
		$cookies.put('location', $scope.location);
		$http.get('/api/yelp/' + $scope.location)
		.then(function(businesses) {
			$scope.restaurants = businesses.data;
			// Populate people going, if logged in
			$scope.setGoings();
		})
		.catch(function(err) {
			console.error(err);
		});
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
		if (restaurant.goings) {
			var l = restaurant.goings.length;
			for (var i = 0; i < l; i++) {
				s += restaurant.goings[i].user_firstName + ' ' + restaurant.goings[i].user_lastName;
				s += (i < (l - 1)) ? ', ' : '';
			} // for
		} // if goings
		return s;
	};

	// $scope.restaurants = biz; // MOCKING
	// INIT
	$http.get('/api/get-user/')
		.then(function(user) {
			$rootScope.user = user.data;
		});
	$scope.location = $cookies.get('location');
	if ($scope.location) $scope.submitSearch();
}
