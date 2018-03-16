'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovies = getMovies;
exports.getMovieById = getMovieById;
exports.getMovieGenres = getMovieGenres;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

async function getMovies(userID) {
  return await db.execQuery(`SELECT m.* 
       FROM mmc.movie AS m 
       JOIN mmc.user_movie AS u
         ON m.id = u.movie_id
      WHERE u.user_id = $1`, [userID]);
} // movie.js
// Model for the Movies endpoint
async function getMovieById(userID, movieID) {
  return await db.execQuery(`SELECT m.*
       FROM mmc.movie AS m
       JOIN mmc.user_movie AS u
         ON m.id = u.movie_id
      WHERE u.user_id = $1
        AND m.id = $2`, [userID, movieID]);
}

async function getMovieGenres(userID, movieID) {
  return await db.execQuery(`SELECT g.genre
       FROM mmc.movie_genre AS g
       JOIN mmc.user_movie AS u
         ON g.movie_id = u.movie_id
      WHERE u.user_id = $1
        AND g.movie_id = $2`, [userID, movieID]);
}