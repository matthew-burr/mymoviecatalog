// movie.js
// Model for the Movies endpoint
import { Model } from './model';
import { QUERIES } from './queries';

export class Movies extends Model {
  async getMovies() {
    return await this.execQuery(QUERIES.SELECT_ALL_MOVIES);
  }

  async getMovieById(movieID) {
    return await this.execQuery(QUERIES.SELECT_ONE_MOVIE, [movieID]);
  }

  async getMovieGenres(movieID) {
    return await this.execQuery(QUERIES.SELECT_MOVIE_GENRE, [movieID]);
  }

  async getMovieTalent(movieID) {
    return await this.execQuery(QUERIES.SELECT_MOVIE_TALENT, [movieID]);
  }

  async postMovie(movie) {
    return await this.execQuery(QUERIES.INSERT_MOVIE, [
      movie.title,
      movie.release_year || null,
      movie.rating || null,
      movie.poster || null,
    ]);
  }

  async putMovie(movieID, movie) {
    return await this.execQuery(QUERIES.UPDATE_MOVIE, [
      movieID,
      movie.title,
      movie.release_year || null,
      movie.rating || null,
      movie.poster || null,
    ]);
  }

  async deleteMovie(movieID) {
    return await this.execQuery(QUERIES.DELETE_MOVIE, [movieID]);
  }

  async addTalentToMovie(movieID, talentID) {
    return await this.execQuery(QUERIES.ADD_TALENT_TO_MOVIE, [
      movieID,
      talentID,
    ]);
  }

  async deleteTalentFromMovie(movieID, talentID) {
    return await this.execQuery(QUERIES.DELETE_TALENT_FROM_MOVIE, [
      movieID,
      talentID,
    ]);
  }

  async addGenreToMovie(movieID, genre) {
    return await this.execQuery(QUERIES.ADD_GENRE_TO_MOVIE, [movieID, genre]);
  }

  async deleteGenreFromMovie(movieID, genre) {
    return await this.execQuery(QUERIES.DELETE_GENRE_FROM_MOVIE, [
      movieID,
      genre,
    ]);
  }
}

export async function getMovies() {
  return await new Movies().getMovies();
}

export async function getMovieById(movieID) {
  return await new Movies().getMovieById(movieID);
}

export async function getMovieGenres(movieID) {
  return await new Movies().getMovieGenres(movieID);
}

export async function getMovieTalent(movieID) {
  return await new Movies().getMovieTalent(movieID);
}

export async function postMovie(movie) {
  return await new Movies().postMovie(movie);
}

export async function putMovie(movieID, movie) {
  return await new Movies().putMovie(movieID, movie);
}

export async function deleteMovie(movieID) {
  return await new Movies().deleteMovie(movieID);
}

export async function addTalentToMovie(movieID, talentID) {
  return await new Movies().addTalentToMovie(movieID, talentID);
}

export async function deleteTalentFromMovie(movieID, talentID) {
  return await new Movies().deleteTalentFromMovie(movieID, talentID);
}

export async function addGenreToMovie(movieID, genre) {
  return await new Movies().addGenreToMovie(movieID, genre);
}

export async function deleteGenreFromMovie(movieID, genre) {
  return await new Movies().deleteGenreFromMovie(movieID, genre);
}
