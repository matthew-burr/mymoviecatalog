const express = require('express');
const bodyParser = require('body-parser');
const talent = require('./build/server/model/talent.js');
const genres = require('./build/server/model/genre.js');
const movies = require('./build/server/model/movie');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('build/public'));
app.use(bodyParser.json());
app.use('/testing', express.static('testing'));

// Talent endpoints
// TODO: Look into nesting endpoints
app.get('/talent', (req, res) => {
  respondWith(res, talent.getTalent);
});
app.get('/talent/:id', (req, res) => {
  respondWith(res, talent.getTalentById, req.params.id);
});
app.get('/talent/:id/movies', (req, res) => {
  respondWith(res, talent.getTalentMovies, req.params.id);
});
app.post('/talent', (req, res) => {
  respondWith(res, talent.postTalent, req.body);
});

// Genre endpoints
app.get('/genres', (req, res) => {
  respondWith(res, genres.getGenres);
});
app.get('/genres/:name/movies', (req, res) => {
  respondWith(res, genres.getGenreMovies, req.params.name);
});

// Movie endpoints
// TODO: user ID functionality needs to be implemented
app.get('/movies', (req, res) => {
  respondWith(res, movies.getMovies);
});
app.get('/movies/:id', (req, res) => {
  respondWith(res, movies.getMovieById, req.params.id);
});
app.get('/movies/:id/genres', (req, res) => {
  respondWith(res, movies.getMovieGenres, req.params.id);
});
app.get('/movies/:id/talent', (req, res) => {
  respondWith(res, movies.getMovieTalent, req.params.id);
});
app.post('/movies', (req, res) => {
  respondWith(res, movies.postMovie, req.body);
});
app.put('/movies/:id', (req, res) => {
  let data = req.body;
  data.id = req.params.id;
  respondWith(res, movies.putMovie, data);
});
app.delete('/movies/:id', (req, res) => {
  respondWith(res, movies.deleteMovie, req.params.id);
});

function respondWith(res, func, ...params) {
  func(...params)
    .then(data => res.json(data))
    .catch(error => sendError(res, error));
}

function sendError(res, error) {
  console.log('Error: ' + error);
  res.status(400).json({ error: error });
}

app.all('*', (req, res) =>
  res.sendFile('index.html', {
    root: __dirname + '/build/public',
  })
);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
