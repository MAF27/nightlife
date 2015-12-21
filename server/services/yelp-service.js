var Yelp = require('yelp');

module.exports = function(location, kind, next) {
	var yelp_kind = kind || 'bar';
	var yelp = new Yelp({
		consumer_key: '6SZMMg4wFSxn1xo3wBP8AQ',
		consumer_secret: 'BpZKq_rIQAL9upKUcAEpwsk0v9s',
		token: 'dDmM1PHNtnwDS8Xw4ozmLydtLctCZYC9',
		token_secret: 'nGdxlxllpfmaB5WrwGTI6qhUE3c',
	});

	var promise = yelp.search({ term: yelp_kind, location: location });
	promise.then(function(data) {
		return next(data.businesses);
	});
};
