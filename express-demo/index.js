const Joi = require('joi'); // Returns a class (hence the convention to use Uppercase for the const name). the joi package is for input validation
const express = require('express'); //this returns a function, so we'll call it 'express'
const app = express();

app.use(express.json());  //this adds a piece of middleware that allow use to parse JSON objects in the body of the request

const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' },
];

//app.get takes two arguments: the first is the url, and the second is a callback function, called a 'Route Handler'. The Route Handler takes two arguments: request and response.
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  //typically, here we'd get a list of courses from the db and return them, but for now...
  res.send(courses);
})

app.post('/api/courses', (req, res) => {
  const schema = { //this is the shape of the course object
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  
  // input validation
  if (result.error) {
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

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given ID was not found');
  res.send(course); 
})

// in a hosted environment, port gets assigned dynamically, so we need to use:
// environment variable 'PORT'
// in order to access that, we need node's 'process' module
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

// in terminal: `export PORT=5000` to export the evironment variable PORT and set it equal to 5000
// in terminal in windows, use 'set'