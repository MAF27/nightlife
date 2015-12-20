var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userService = require("../services/going-service");

var goingSchema = new Schema({
   rest_id: String,
   username: String,
   created: { type: Date, 'default': Date.now }
});

var Going = mongoose.model('Going', goingSchema);

module.exports = Going;
