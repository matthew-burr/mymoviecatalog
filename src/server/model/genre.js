import * as db from './db';

export async function getGenres() {
  return await db.execQuery('SELECT unnest(enum_range(NULL::mmc.genre))');
}

export async function getGenreMovies(genre) {
  return await db.execQuery(
    'SELECT * FROM mmc.movie_genre WHERE genre = $1::mmc.genre',
    [genre]
  );
}
