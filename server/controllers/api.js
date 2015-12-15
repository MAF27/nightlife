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


module.exports.yelp = client.search({
		terms: "restaurants",
		location: "Zurich"
	})
	.then(function(data) {

		var output = [];
		data.businesses.forEach(function(item) {
			output.push(item.name);
		});
		console.log(output);
	});
