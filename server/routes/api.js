var express = require('express');
var router = express.Router();

// All routes relative to host/api
router.get('/get-user', function(req, res) {
	var vm = { user: req.user ? req.user.firstName : null };
	res.json(vm);
});

module.exports = router;
