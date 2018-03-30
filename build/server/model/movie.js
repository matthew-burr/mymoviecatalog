'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movies = undefined;
exports.getMovies = getMovies;
exports.getMovieById = getMovieById;
exports.getMovieGenres = getMovieGenres;
exports.getMovieTalent = getMovieTalent;
exports.postMovie = postMovie;
exports.putMovie = putMovie;
exports.deleteMovie = deleteMovie;
exports.addTalentToMovie = addTalentToMovie;
exports.deleteTalentFromMovie = deleteTalentFromMovie;
exports.addGenreToMovie = addGenreToMovie;
exports.deleteGenreFromMovie = deleteGenreFromMovie;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

var _query_strings = require('./query_strings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// movie.js
// Model for the Movies endpoint
class Movies {
  async getMovies() {
    return await db.execQuery(_query_strings.QUERY_STRINGS.SELECT_ALL_MOVIES);
  }

  async getMovieById(movieID) {
    return await db.execQuery(_query_strings.QUERY_STRINGS.SELECT_ONE_MOVIE, [movieID]);
  }

  async getMovieGenres(movieID) {
    return await db.execQuery(_query_strings.QUERY_STRINGS.SELECT_MOVIE_GENRE, [movieID]);
  }

  async getMovieTalent(movieID) {
    return await db.execQuery(_query_strings.QUERY_STRINGS.SELECT_MOVIE_TALENT, [movieID]);
  }

  async postMovie(movie) {
    return await db.execQuery(_query_strings.QUERY_STRINGS.INSERT_MOVIE, [movie.title, movie.release_year || null, movie.rating || null, movie.poster || null]);
  }

  async putMovie(movieID, movie) {
    return await db.execQuery(_query_strings.QUERY_STRINGS.UPDATE_MOVIE, [movieID, movie.title, movie.release_year || null, movie.rating || null, movie.poster || null]);
  }

  async deleteMovie(movieID) {
    return await db.execQuery(_query_strings.QUERY_STRINGS.DELETE_MOVIE, [movieID]);
  }

  async addTalentToMovie(movieID, talentID) {
    return await db.execQuery(_query_strings.QUERY_STRINGS.ADD_TALENT_TO_MOVIE, [movieID, talentID]);
  }

  async deleteTalentFromMovie(movieID, talentID) {
    return await db.execQuery(_query_strings.QUERY_STRINGS.DELETE_TALENT_FROM_MOVIE, [movieID, talentID]);
  }

  async addGenreToMovie(movieID, genre) {
    return await db.execQuery(_query_strings.QUERY_STRINGS.ADD_GENRE_TO_MOVIE, [movieID, genre]);
  }

  async deleteGenreFromMovie(movieID, genre) {
    return await db.execQuery(_query_strings.QUERY_STRINGS.DELETE_GENRE_FROM_MOVIE, [movieID, genre]);
  }
}

exports.Movies = Movies;
async function getMovies() {
  return await new Movies().getMovies();
}

async function getMovieById(movieID) {
  return await new Movies().getMovieById(movieID);
}

async function getMovieGenres(movieID) {
  return await new Movies().getMovieGenres(movieID);
}

async function getMovieTalent(movieID) {
  return await new Movies().getMovieTalent(movieID);
}

async function postMovie(movie) {
  return await new Movies().postMovie(movie);
}

async function putMovie(movieID, movie) {
  return await new Movies().putMovie(movieID, movie);
}

async function deleteMovie(movieID) {
  return await new Movies().deleteMovie(movieID);
}

async function addTalentToMovie(movieID, talentID) {
  return await new Movies().addTalentToMovie(movieID, talentID);
}

async function deleteTalentFromMovie(movieID, talentID) {
  return await new Movies().deleteTalentFromMovie(movieID, talentID);
}

async function addGenreToMovie(movieID, genre) {
  return await new Movies().addGenreToMovie(movieID, genre);
}

async function deleteGenreFromMovie(movieID, genre) {
  return await new Movies().deleteGenreFromMovie(movieID, genre);
}