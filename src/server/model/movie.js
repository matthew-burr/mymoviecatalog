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
  return await db.execQuery(QUERY_STRINGS.INSERT_MOVIE, [
    movie.title,
    movie.release_year || null,
    movie.rating || null,
    movie.poster || null,
  ]);
}

export async function putMovie(movieID, movie) {
  return await db.execQuery(QUERY_STRINGS.UPDATE_MOVIE, [
    movieID,
    movie.title,
    movie.release_year || null,
    movie.rating || null,
    movie.poster || null,
  ]);
}

export async function deleteMovie(movieID) {
  return await db.execQuery(QUERY_STRINGS.DELETE_MOVIE, [movieID]);
}

export async function addTalentToMovie(movieID, talentID) {
  return await db.execQuery(QUERY_STRINGS.ADD_TALENT_TO_MOVIE, [
    movieID,
    talentID,
  ]);
}

export async function deleteTalentFromMovie(movieID, talentID) {
  return await db.execQuery(QUERY_STRINGS.DELETE_TALENT_FROM_MOVIE, [
    movieID,
    talentID,
  ]);
}

export async function addGenreToMovie(movieID, genre) {
  return await db.execQuery(QUERY_STRINGS.ADD_GENRE_TO_MOVIE, [movieID, genre]);
}

export async function deleteGenreFromMovie(movieID, genre) {
  return await db.execQuery(QUERY_STRINGS.DELETE_GENRE_FROM_MOVIE, [
    movieID,
    genre,
  ]);
}
