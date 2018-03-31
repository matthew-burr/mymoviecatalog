const express = require('express');
const bodyParser = require('body-parser');
const talent = require('./build/server/model/talent.js');
const genres = require('./build/server/model/genre.js');
const movies = require('./build/server/model/movie');
const mmcuser = require('./build/server/model/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = 'n0b0dy-should-ever-no-this-secr3t';
const SALT_ROUNDS = 10;

app.use(express.static('build/public'));
app.use(bodyParser.json());
app.use('/testing', express.static('testing'));

// User endpoints
app.post('/log_in', async (req, res) => {
  verifyLogin(req);
  let { username, password } = req.body;

  if (username && password) {
    let [account] = await mmcuser.getUser(username);
    if (password === account.password) {
      let token = jwt.sign({ id: account.id }, SECRET);
      res.send({ success: true, token: token });
      return;
    }
  }

  res.send({ success: false });
});
// User endpoinst
app.post('/user', (req, res) => {
  let { email, first_name, last_name, password } = req.body;
  bcrypt.hash(password, SALT_ROUNDS).then(hashedPassword => {
    mmcuser
      .addUser({
        email: email,
        first_name: first_name || '',
        last_name: last_name || '',
        password: hashedPassword,
      })
      .then(rows => {
        let [account] = rows;
        let token = jwt.sign({ id: account.id }, SECRET);
        res.status(200).send({
          user: {
            email: email,
            first_name: first_name,
            last_name: last_name,
          },
          token: token,
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({ status: 400, error: err });
      });
  });
});

// Talent endpoints
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
  respondWith(res, movies.putMovie, req.params.id, req.body);
});
app.delete('/movies/:id', (req, res) => {
  respondWith(res, movies.deleteMovie, req.params.id);
});
app.post('/movies/:id/talent/:talent_id', (req, res) => {
  respondWith(
    res,
    movies.addTalentToMovie,
    req.params.id,
    req.params.talent_id
  );
});
app.delete('/movies/:id/talent/:talent_id', (req, res) => {
  respondWith(
    res,
    movies.deleteTalentFromMovie,
    req.params.id,
    req.params.talent_id
  );
});
app.post('/movies/:id/genres/:genre', (req, res) => {
  respondWith(res, movies.addGenreToMovie, req.params.id, req.params.genre);
});
app.delete('/movies/:id/genres/:genre', (req, res) => {
  respondWith(
    res,
    movies.deleteGenreFromMovie,
    req.params.id,
    req.params.genre
  );
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

function verifyLogin(req) {
  let { token } = req.body;
  if (token) {
    try {
      req.mmcUserID = jwt.verify(token, SECRET).id;
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
}

app.all('*', (req, res) =>
  res.sendFile('index.html', {
    root: __dirname + '/build/public',
  })
);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
