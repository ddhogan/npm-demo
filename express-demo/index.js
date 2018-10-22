const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const courses = require('./routes/courses')
const home = require('./routes/home')
const express = require('express');
const app = express();

// two ways to access the node environment:
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //if we don't set it, this will return undefined
// console.log(`'env': ${app.get('env')}`); //if NODE_ENV is not set, this will return 'development' by default

app.use(express.json());  //this adds a piece of middleware that allow use to parse JSON objects in the body of the request
app.use(express.urlencoded({ extended: true }));  // key=value&key=value
app.use(express.static('public')); // This will be a directory containing all the static assets (CSS, images, etc)
app.use(helmet()); // sets various http headers for security

app.set('view engine', 'pug'); // when we set this, node will automatically load this module, so we don't have to require it
app.set('views', './views');  // this is default case, put all the views in that folder. don't have to set this.

app.use('/api/courses', courses); // for any route that starts with this url, use the router object in courses
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));  // In terminal, we did `export app_password=1234` always prefix the name of the password with the app it's associated with

if (app.get('env') === 'development') {
  app.use(morgan('tiny')); // we want to limit the number of middlewares in production since they impact performance
  startupDebugger('Morgan enabled...');
}

// This here is the most basic custom middleware
app.use(logger);

// Another middleware, this time for authentication.  Note that they're called in sequence.
app.use(function(req, res, next) {
  console.log("Authenticating..."); //  Let's pretend we want to log every request
  next(); // go to the next function in the req-res pipeline
});

// in a hosted environment, port gets assigned dynamically, so we need to use:
// environment variable 'PORT'
// in order to access that, we need node's 'process' module
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

// in terminal: `export PORT=5000` to export the environment variable PORT and set it equal to 5000 or whatever
// in terminal in windows, use 'set'