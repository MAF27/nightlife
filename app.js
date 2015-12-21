// External Dependencies
var express 			= require('express');
var exprSession 	= require('express-session');
var cors 					= require('cors');
var logger 				= require('morgan');
var http 					= require('http');
var bodyParser 		= require('body-parser');
var cookieParser 	= require('cookie-parser');
var	passport 			= require('passport');
var mongoose 			= require('mongoose');
var http 					= require('http');
// Internal Dependencies
var passConf 			= require(__dirname + "/server/auth/passport-config");
var routes 				= require('./server/routes/index');
var users 				= require('./server/routes/users');
var api 					= require('./server/routes/api');

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
passConf();
app.use(passport.initialize());
app.use(passport.session());

// ROUTING
app.use('/', routes);
app.use('/users', users);
app.use('/api', api);
app.use(express.static(__dirname + '/client'));

// CONFIGURE PORT FOR DEV AND PROD, START SERVER
app.set('port', process.env.PORT || 3000);
var server = http.createServer(app);
server.listen(app.get('port'), function() {
	console.log('Nightlife server listening on port ' + app.get('port') + ' ...');
});
