// movie.js
// Model for the Movies endpoint
import * as db from './db';
import { QUERY_STRINGS } from './query_strings';

export async function getMovies() {
  return await db.execQuery(QUERY_STRINGS.SELECT_ALL_MOVIES);
}

export async function getMovieById(movieID) {
  return await db.execQuery(QUERY_STRINGS.SELECT_ONE_MOVIE, [movieID]);
}

export async function getMovieGenres(movieID) {
  return await db.execQuery(QUERY_STRINGS.SELECT_MOVIE_GENRE, [movieID]);
}

export async function getMovieTalent(movieID) {
  return await db.execQuery(QUERY_STRINGS.SELECT_MOVIE_TALENT, [movieID]);
}

export async function postMovie(movie) {
  return await db.execQuery(QUERY_STRINGS.INSERT_MOVIE, [movie.title]);
}
