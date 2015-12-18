var app = require('angular').module('nightlife');

require('./routing.js');
app.controller('ListingCtrl', require('./listing'));
