// genre.js
// Model for the Genre endpoint
import * as db from './db';

export async function getGenres() {
  return await db.execQuery(
    'SELECT unnest(enum_range(NULL::mmc.genre)) AS genre'
  );
}

export async function getGenreMovies(genre) {
  return await db.execQuery(
    `SELECT m.id, m.title 
       FROM mmc.movie_genre AS g
       JOIN mmc.movie AS m
         ON g.movie_id = m.id
      WHERE g.genre = $1::mmc.genre`,
    [genre]
  );
}
