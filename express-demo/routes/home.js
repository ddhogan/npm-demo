const express = require('express');
const router = express.Router(); // here, instead of working with the 'app' object, we work with the 'router' object

//app.get takes two arguments: the first is the url, and the second is a callback function, called a 'Route Handler'. The Route Handler takes two arguments: request and response.
// Root
router.get('/', (req, res) => {
  // res.send('Hello World'); // this was what we had before
  res.render('index', { title: 'My Express App', message: 'Hello' }); // this is how to render in pug
});

module.exports = router;