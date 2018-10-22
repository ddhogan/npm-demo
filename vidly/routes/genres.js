const express = require('express');
const router = express.Router();
const Joi = require('joi');

// instead of a DB...
const genres = [
  { id: 1, name: 'documentaries' },
  { id: 2, name: 'comedy' },
  { id: 3, name: 'drama' },  
];

// Index
router.get('/', (req, res) => {
  res.send(genres);
});

// Create
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('There\'s no genre with that ID');
  res.send(genre);
})

// Update
router.put('/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send(`There's no genre with that ID`);

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
})

// Delete
router.delete('/:id', (req, res) => {
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

module.exports =  router;