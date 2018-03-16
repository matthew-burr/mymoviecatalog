// movie.js
// Model for the Movies endpoint
import * as db from './db';

export async function getMovies() {
  return await db.execQuery(
    `SELECT *
       FROM mmc.movie AS m`
  );
}

export async function getMovieById(movieID) {
  return await db.execQuery(
    `SELECT m.*
       FROM mmc.movie AS m
      WHERE m.id = $1`,
    [movieID]
  );
}

export async function getMovieGenres(movieID) {
  return await db.execQuery(
    `SELECT g.genre
       FROM mmc.movie_genre AS g
      WHERE g.movie_id = $1`,
    [movieID]
  );
}
