const express = require('express');
const talent = require('./build/server/model/talent.js');
const genres = require('./build/server/model/genre.js');
const movies = require('./build/server/model/movie');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('build/public'));

// Talent endpoints
// TODO: Look into nesting endpoints
app.get('/talent', (req, res) => {
  talent
    .getTalent()
    .then(data => res.json(data))
    .catch(error => sendError(error));
});
app.get('/talent/:id', (req, res) => {
  talent
    .getTalentById(req.params.id)
    .then(data => res.json(data))
    .catch(error => sendError(error));
});
app.get('/talent/:id/movies', (req, res) => {
  talent
    .getTalentMovies(req.params.id)
    .then(data => res.json(data))
    .catch(error => sendError(error));
});

// Genre endpoints
app.get('/genres', (req, res) => {
  genres
    .getGenres()
    .then(data => res.json(data))
    .catch(error => sendError(error));
});
app.get('/genres/:name/movies', (req, res) => {
  genres
    .getGenreMovies(req.params.name)
    .then(data => res.json(data))
    .catch(error => sendError(error));
});

// Movie endpoints
// TODO: user ID functionality needs to be implemented
app.get('/movies', (req, res) => {
  movies
    .getMovies()
    .then(data => res.json(data))
    .catch(error => sendError(error));
});
app.get('/movies/:id', (req, res) => {
  movies
    .getMovieById(req.params.id)
    .then(data => res.json(data))
    .catch(error => sendError(error));
});
app.get('/movies/:id/genres', (req, res) => {
  movies
    .getMovieGenres(req.params.id)
    .then(data => res.json(data))
    .catch(error => sendError(error));
});

function sendError(res, error) {
  console.log('Error:' + error);
}

app.all('*', (req, res) =>
  res.sendFile('index.html', {
    root: __dirname + '/build/public',
  })
);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
