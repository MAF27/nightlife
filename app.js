var express 		= require('express');
var exprSession = require('express-session');
var cors 				= require('cors');
var logger 			= require('morgan');
var http 				= require('http');
var bodyParser 	= require('body-parser');
var cookieParser = require('cookie-parser');
var	passport 		= require('passport');
var passportConfig = require(__dirname + "/server/auth/passport-config");
var mongoose 		= require('mongoose');
var users 			= require('./server/routes/users');
var routes 			= require('./server/routes/index');

var	app = express();

// Handlebars view setup
app.set('views', __dirname + '/server/views');
app.set('view engine', 'hbs');

// Connect to MongoLab DB
mongoose.connect('mongodb://adminmaf:mafmaf@ds027505.mongolab.com:27505/nightlife');

// URL parsing, express session
app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(exprSession({ secret: 'keyboard catandmouse', resave: true, saveUninitialized: true }));

// Configure Passport Authentication
passportConfig();
// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// ROUTING
app.use('/', routes);
app.use('/users', users);
app.use('/client', express.static(__dirname + '/client'));

var server = http.createServer(app);
server.listen(3000, function() {
	console.log("Nightlife server listening on port 3000 ...");
});
