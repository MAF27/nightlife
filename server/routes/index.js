var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res) {
	var vm = { user: req.user ? req.user.firstName : null };
	res.render('index', vm);
}); // Root

router.get('/success', restrict, function(req, res, next) {
	var vm = { user: req.user.firstName };
	console.log('* Routing to Success, packing user: ', req.user);
	res.render('success', vm);
});

// test authentication
function restrict(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = router;
