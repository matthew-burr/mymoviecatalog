'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovies = getMovies;
exports.getMovieById = getMovieById;
exports.getMovieGenres = getMovieGenres;
exports.getMovieTalent = getMovieTalent;
exports.postMovie = postMovie;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

async function getMovies() {
  return await db.execQuery(`SELECT *
       FROM mmc.movie AS m`);
} // movie.js
// Model for the Movies endpoint
async function getMovieById(movieID) {
  return await db.execQuery(`SELECT m.*
       FROM mmc.movie AS m
      WHERE m.id = $1`, [movieID]);
}

async function getMovieGenres(movieID) {
  return await db.execQuery(`SELECT g.genre
       FROM mmc.movie_genre AS g
      WHERE g.movie_id = $1`, [movieID]);
}

async function getMovieTalent(movieID) {
  return await db.execQuery(`SELECT t.*
       FROM mmc.movie_talent AS m
       JOIN mmc.talent AS t
         ON m.talent_id = t.id
      WHERE m.movie_id = $1`, [movieID]);
}

async function postMovie(movie) {
  return await db.execQuery(`INSERT INTO mmc.movie (title)
     VALUES ($1)
     RETURNING *`, [movie.title]);
}