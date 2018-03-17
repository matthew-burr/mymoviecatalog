'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovies = getMovies;
exports.getMovieById = getMovieById;
exports.getMovieGenres = getMovieGenres;
exports.getMovieTalent = getMovieTalent;
exports.postMovie = postMovie;
exports.putMovie = putMovie;
exports.deleteMovie = deleteMovie;
exports.addTalentToMovie = addTalentToMovie;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

var _query_strings = require('./query_strings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// movie.js
// Model for the Movies endpoint
async function getMovies() {
  return await db.execQuery(_query_strings.QUERY_STRINGS.SELECT_ALL_MOVIES);
}

async function getMovieById(movieID) {
  return await db.execQuery(_query_strings.QUERY_STRINGS.SELECT_ONE_MOVIE, [movieID]);
}

async function getMovieGenres(movieID) {
  return await db.execQuery(_query_strings.QUERY_STRINGS.SELECT_MOVIE_GENRE, [movieID]);
}

async function getMovieTalent(movieID) {
  return await db.execQuery(_query_strings.QUERY_STRINGS.SELECT_MOVIE_TALENT, [movieID]);
}

async function postMovie(movie) {
  return await db.execQuery(_query_strings.QUERY_STRINGS.INSERT_MOVIE, [movie.title]);
}

async function putMovie(movie) {
  return await db.execQuery(_query_strings.QUERY_STRINGS.UPDATE_MOVIE, [movie.id, movie.title]);
}

async function deleteMovie(movieID) {
  return await db.execQuery(_query_strings.QUERY_STRINGS.DELETE_MOVIE, [movieID]);
}

async function addTalentToMovie(movieID, talentID) {
  return await db.execQuery(_query_strings.QUERY_STRINGS.ADD_TALENT_TO_MOVIE, [movieID, talentID]);
}