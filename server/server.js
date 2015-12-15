var express 		= require('express');
var exprSession = require('express-session');
var logger 			= require('morgan');
var http 				= require('http');
var bodyParser 	= require('body-parser');
var	passport 		= require('passport');
var mongoose 		= require('mongoose');
var users 			= require('./routes/users');

var	app = express();

// Connect to MongoLab DB
mongoose.connect('mongodb://adminmaf:mafmaf@ds027505.mongolab.com:27505/nightlife');

// Configure Passport Authentication
var passportConfig = require("./auth/passport-config");
passportConfig();

// Handlebars view setup
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.engine('hbs', require('hbs').__express);

// URL parsing, express session
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(exprSession({ secret: 'keyboard catandmouse', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// ROUTING
app.use('/users', users);

app.get('/', function(req, res) {
	var vm = {
		username: req.user ? req.user.firstName + " " + req.user.lastName : null
	};
	console.log('app.get root: Sending vm: ', vm );
	res.render('index', vm);
}); // Root

app.use('/client', express.static(__dirname + '../client'));

var server = http.createServer(app);
server.listen(3000, function() {
	console.log("Nightlife server listening on port 3000 ...");
});
