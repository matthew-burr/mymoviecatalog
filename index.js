const express = require('express');
const talent = require('./build/server/model/talent.js');
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

function sendError(res, error) {
  console.log(error);
}

app.all('*', (req, res) =>
  res.sendFile('index.html', {
    root: __dirname + '/build/public',
  })
);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
