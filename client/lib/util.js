var angular = require('angular');
var yelp = require("node-yelp");

module.exports = {
	getRestForLoc: function(location) {
		$injector = angular.injector(['ng']);
		$q = $injector.get('$q');
		return $q(function(resolve, reject) {
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
					location: location
				})
				.then(function(data) {
					console.log(data.businesses);
					resolve(data.businesses);
				}, function(reason) {
					reject('Error fetching Yelp data');
				});
		});
	},
	getElement: function(el, arr) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].id === el)
				return (i);
		}
	},
	parseGoings: function(gArr, fCurrentGoing) {
		// If anyone's going
		if (gArr) {
			var s = '';
			// How many are going?
			var count = gArr.length;

			// Only me
			if (count < 1 && fCurrentGoing) {
				return 'You are going';
			}
			// One person, not me, is going
			if (count === 1 && !fCurrentGoing) {
				return gArr[0].user_firstName + ' is going';
			}
			// Two people, including me, are going
			if (count === 1 && fCurrentGoing) {
				return gArr[0].user_firstName + ' and you are going';
			}
			if (count === 2) {
				if (fCurrentGoing) {
					return gArr[0].user_firstName + ', ' + gArr[1].user_firstName + ' and you are going';
				} else {
					return gArr[0].user_firstName + ' and ' + gArr[1].user_firstName + ' are going';
				}
			}
			// More people, build string
			if (count > 2) {
				s = gArr[0].user_firstName + ', ' + gArr[1].user_firstName;
				s += fCurrentGoing ? ', you ' : '';
				s += ' and ' + (count - 2) + ' more are going';
				return s;
			}
		} else return '';
	}
};
