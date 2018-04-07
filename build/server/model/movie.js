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

var _model = require('./model');

var _queries = require('./queries');

// movie.js
// Model for the Movies endpoint
class Movies extends _model.Model {
  constructor(userID) {
    super(userID);
    this.getMovies = this.getMovies.bind(this);
    this.getMovieById = this.getMovieById.bind(this);
    this.getMovieGenres = this.getMovieGenres.bind(this);
    this.getMovieTalent = this.getMovieTalent.bind(this);
    this.postMovie = this.postMovie.bind(this);
    this.putMovie = this.putMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.addTalentToMovie = this.addTalentToMovie.bind(this);
    this.deleteTalentFromMovie = this.deleteTalentFromMovie.bind(this);
    this.addGenreToMovie = this.addGenreToMovie.bind(this);
    this.deleteGenreFromMovie = this.deleteGenreFromMovie.bind(this);
  }

  async getMovies() {
    return await this.execQuery(_queries.QUERIES.SELECT_ALL_MOVIES);
  }

  async getMovieById(movieID) {
    return await this.execQuery(_queries.QUERIES.SELECT_ONE_MOVIE, [movieID]);
  }

  async getMovieGenres(movieID) {
    return await this.execQuery(_queries.QUERIES.SELECT_MOVIE_GENRE, [movieID]);
  }

  async getMovieTalent(movieID) {
    return await this.execQuery(_queries.QUERIES.SELECT_MOVIE_TALENT, [movieID]);
  }

  async postMovie(movie) {
    console.log(movie);
    return await this.execQuery(_queries.QUERIES.INSERT_MOVIE, [movie.title, movie.release_year || null, movie.rating || null, movie.poster || null]);
  }

  async putMovie(movieID, movie) {
    return await this.execQuery(_queries.QUERIES.UPDATE_MOVIE, [movieID, movie.title, movie.release_year || null, movie.rating || null, movie.poster || null]);
  }

  async deleteMovie(movieID) {
    return await this.execQuery(_queries.QUERIES.DELETE_MOVIE, [movieID]);
  }

  async addTalentToMovie(movieID, talentID) {
    return await this.execQuery(_queries.QUERIES.ADD_TALENT_TO_MOVIE, [movieID, talentID]);
  }

  async deleteTalentFromMovie(movieID, talentID) {
    return await this.execQuery(_queries.QUERIES.DELETE_TALENT_FROM_MOVIE, [movieID, talentID]);
  }

  async addGenreToMovie(movieID, genre) {
    return await this.execQuery(_queries.QUERIES.ADD_GENRE_TO_MOVIE, [movieID, genre]);
  }

  async deleteGenreFromMovie(movieID, genre) {
    return await this.execQuery(_queries.QUERIES.DELETE_GENRE_FROM_MOVIE, [movieID, genre]);
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