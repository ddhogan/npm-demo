const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi'); // Returns a class (hence the convention to use Uppercase for the const name). the joi package is for input validation
const logger = require('./logger');
const express = require('express'); //this returns a function, so we'll call it 'express'
const app = express();

app.use(express.json());  //this adds a piece of middleware that allow use to parse JSON objects in the body of the request
app.use(express.urlencoded({ extended: true }));  // key=value&key=value
app.use(express.static('public')); // This will be a directory containing all the static assets (CSS, images, etc)
app.use(helmet()); // sets various http headers for security
app.use(morgan('tiny')); //logs every http request to the console so you can see what happened

// This here is the most basic custom middleware
app.use(logger);

// Another middleware, this time for authentication.  Note that they're called in sequence.
app.use(function(req, res, next) {
  console.log("Authenticating..."); //  Let's pretend we want to log every request
  next(); // go to the next function in the req-res pipeline
});

// instead of a DB
const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' },
];

//app.get takes two arguments: the first is the url, and the second is a callback function, called a 'Route Handler'. The Route Handler takes two arguments: request and response.
// Root
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Index
app.get('/api/courses', (req, res) => {
  //typically, here we'd get a list of courses from the db and return them, but for now...
  res.send(courses);
})

// Create
app.post('/api/courses', (req, res) => {
  // validate the input
  const { error } = validateCourse(req.body); // Object destructuring, can use {error} instead of result
  if (error) { // was (result.error)
    // RESTful convention is to return a response with HTTP status code 400: bad request
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course); // by convention, return the thing you just made
})

// Retrieve
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');
  res.send(course); 
})

// Update
app.put('/api/courses/:id', (req, res) => {
  // find the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');
   
  // validate the input
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(result.error.details[0].message); // this is the same logic as from the POST request handler, but written as one line

  // update the course
  course.name = req.body.name;
  // return the course
  res.send(course);
})

function validateCourse(course) {
  const schema = { //this is the shape of the course object
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

// Delete
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  const index = courses.indexOf(course); //in our courses array, find the index of the course
  courses.splice(index, 1); //in the array, go to that index and delete one thing

  res.send(course);  //by convention, return the thing that was just deleted
})

// in a hosted environment, port gets assigned dynamically, so we need to use:
// environment variable 'PORT'
// in order to access that, we need node's 'process' module
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

// in terminal: `export PORT=5000` to export the environment variable PORT and set it equal to 5000 or whatever
// in terminal in windows, use 'set'