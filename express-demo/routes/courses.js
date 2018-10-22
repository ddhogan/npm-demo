const express = require('express');
const router = express.Router(); // here, instead of working with the 'app' object, we work with the 'router' object
const Joi = require('joi'); // Returns a class (hence the convention to use Uppercase for the const name). the joi package is for input validation

// instead of a DB
const courses = [
  { id: 1, name: 'course 1' },
  { id: 2, name: 'course 2' },
  { id: 3, name: 'course 3' },
];

// Index
router.get('/', (req, res) => {   // was '/api/courses', but we're simplifying the routes
  //typically, here we'd get a list of courses from the db and return them, but for now...
  res.send(courses);
})

// Create
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => { // was '/api/courses/:id'
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');
  res.send(course); 
})

// Update
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  const index = courses.indexOf(course); //in our courses array, find the index of the course
  courses.splice(index, 1); //in the array, go to that index and delete one thing

  res.send(course);  //by convention, return the thing that was just deleted
})

module.exports = router;

// get the router at the top, add routes to it, and then export it as a module.