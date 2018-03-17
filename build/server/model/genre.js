'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGenres = getGenres;
exports.getGenreMovies = getGenreMovies;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

var _query_strings = require('./query_strings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// genre.js
// Model for the Genre endpoint
async function getGenres() {
  return await db.execQuery(_query_strings.QUERY_STRINGS.SELECT_ALL_GENRES);
}

async function getGenreMovies(genre) {
  return await db.execQuery(_query_strings.QUERY_STRINGS.SELECT_GENRE_MOVIES, [genre]);
}