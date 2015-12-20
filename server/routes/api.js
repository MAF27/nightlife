var express = require('express');
var router = express.Router();
var GoingService = require('../services/going-service');

// All routes relative to host/api
router.get('/get-user', function(req, res) {
	var vm = {
		user: req.user ? req.user.firstName : null
	};
	res.status(200).json(vm);
});

router.post('/save-going', function(req, res, next) {
	console.log('* SAVE GOING: req.body: ', req.body);
	GoingService.addGoing(req.body.rest_id, req.body.username, function(err, going) {
		if (err) {
			throw err;
		} else {
			return res.status(200).json(going);
		}
	});
});

router.get('/get-goings/:rest_id', function(req, res, next) {
	GoingService.getGoings(req.params.rest_id, function(err, goings) {
		if (err) {
			throw err;
		} else {
			console.log('* GET GOINGS: For ID ' + req.params.rest_id + ': ' + goings);
			return res.status(200).json(goings);
		}
	});
});

module.exports = router;
