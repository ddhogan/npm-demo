const express = require('express');
const router = express.Router();

// root
router.get('/', (req, res) => {
  res.send('<h1>Welcome to Vidly</h1><p><em>The video streaming service that totally exists</em></p><a href="/api/genres">View Genres</a>');
});

module.exports =  router;