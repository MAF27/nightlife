var express = require('express');
var passport = require("passport");
var router = express.Router();

var UserService = require("../services/user-service");
var restrict = require("../auth/restrict");

router.get('/signup', function(req, res, next) {
	var vm = {
		title: 'Register as a new user'
	};
	res.render('signup', vm);
});

router.post('/signup', function(req, res, next) {
	UserService.addUser(req.body, function(err) {
		if (err) {
			var vm = {
				title: 'Register as a new user',
				input: req.body,
				error: err
			};
			console.log(err);
			delete vm.input.password;
			return res.render('signup', vm);
		}
		req.login(req.body, function(err) {
			if (err) {
				return console.log(err);
			}
			res.redirect('/');
		});
	});
});

router.get('/login', function(req, res, next) {
	var vm = {
		title: 'Please log in'
	};
	res.render('login', vm);
});

router.post('/login', passport.authenticate('local', {
	failureRedirect: '/users/login',
	successRedirect: '/',
	failureFlash: 'Invalid credentials.'
}));

router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});

// router.get('/profile', restrict, function(req, res, next) {
router.get('/profile', function(req, res, next) {
	var vm = {
		username: req.user ? req.user.firstName : null,
		input: req.user
	};
	res.render('profile', vm);
});

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', {
		failureRedirect: '/users/login'
	}),
	function(req, res) {
		// Successful authentication, redirect home.
		res.redirect('/');
	});

module.exports = router;
