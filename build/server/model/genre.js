'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGenres = getGenres;
exports.getGenreMovies = getGenreMovies;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

async function getGenres() {
  return await db.execQuery('SELECT unnest(enum_range(NULL::mmc.genre)) AS genre');
} // genre.js
// Model for the Genre endpoint
async function getGenreMovies(genre) {
  return await db.execQuery('SELECT * FROM mmc.movie_genre WHERE genre = $1::mmc.genre', [genre]);
}