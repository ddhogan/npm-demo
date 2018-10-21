const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// instead of a DB...
const genres = [
  { id: 1, name: 'documentaries' },
  { id: 2, name: 'comedy' },
  { id: 3, name: 'drama' },  
];

// root
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Vidly</h1><p><em>The video streaming service that totally exists</em></p><a href="/api/genres">View Genres</a>');
});

// Index
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

// Create
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const genre = { 
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
})

// Retrieve
app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('There\'s no genre with that ID');
  res.send(genre);
})

// Update
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(`There's no genre with that ID`);

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
})

// Delete
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('There\'s no genre with that ID');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
})

// helper function
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

// set up the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}... http://localhost:${port}`))