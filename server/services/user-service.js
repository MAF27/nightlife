var User = require("../models/user");
var bcrypt = require("bcrypt");

exports.addUser = function(user, next) {
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }

    var newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: hash,
      twitter: { id: user.twitter.id }
    });

    console.log('addUser: newUser: ', newUser);
    newUser.save(function(err) {
      console.log('>>> After adding user: err: ', err);
      if (err) {
        return next(err);
      }
      next(null);
    });
  });
};

exports.findUser = function(username, next) {
  User.findOne({
    username: username
  }, function(err, user) {
    next(err, user);
  });
};
