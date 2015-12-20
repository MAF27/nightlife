var express = require('express');
var router = express.Router();
var GoingService = require('../services/going-service');
var Going = require("../models/going");


// All routes relative to host/api
router.get('/get-user', function(req, res) {
	var vm = {
		user: req.user ? req.user.firstName : null
	};
	res.status(200)
		.json(vm);
});

router.post('/save-going', function(req, res) {
	var newGoing = new Going({
		rest_id: req.body.rest_id,
		username: req.body.username
	});

	newGoing.save(function(err, user) {
		if (err) {
			console.log('api/save/going: Error adding user: ', err);
			res.status(500)
				.json(err);
		}
		res.status(200)
			.json(user);
	});
});

router.get('/get-goings/:rest_id', function(req, res) {
	Going.find({
		rest_id: req.params.rest_id
	}, function(err, goings) {
		if (err) {
			console.log('Error /api/get-goings: ', err);
		} else {
			if (goings.length > 0) {
				console.log('* /api/get-goings: FOUND ', goings);
			}
			return res.status(200)
				.json(goings);
		}
	});

});

module.exports = router;
