const express = require('express'); //this returns a function, so we'll call it 'express'
const app = express();

//app.get takes two arguments: the first is the url, and the second is a callback function, called a 'Route Handler'. The Route Handler takes two arguments: request and response.
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  //typically, here we'd get a list of courses from the db and return them, but for now...
  res.send(['Course 1', 'Course 2', 'Course 3'])
})

app.get('/api/courses/:id', (req, res) => {
  res.send(req.params.id);
})

// in a hosted environment, port gets assigned dynamically, so we need to use:
// environment variable 'PORT'
// in order to access that, we need node's 'process' module
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

// in terminal: `export PORT=5000` to export the evironment variable PORT and set it equal to 5000
// in terminal in windows, use 'set'