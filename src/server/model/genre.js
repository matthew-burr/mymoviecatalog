// genre.js
// Model for the Genre endpoint
import * as db from './db';
import { QUERY_STRINGS } from './query_strings';

export class Genre {
  async getGenres() {
    return await db.execQuery(QUERY_STRINGS.SELECT_ALL_GENRES);
  }

  async getGenreMovies(genre) {
    return await db.execQuery(QUERY_STRINGS.SELECT_GENRE_MOVIES, [genre]);
  }
}

export async function getGenres() {
  return await new Genre().getGenres();
}

export async function getGenreMovies(genre) {
  return await new Genre().getGenreMovies(genre);
}
