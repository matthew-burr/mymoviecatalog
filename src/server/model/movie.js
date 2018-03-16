// movie.js
// Model for the Movies endpoint
import * as db from './db';

export async function getMovies(userID) {
  return await db.execQuery(
    `SELECT m.* 
       FROM mmc.movie AS m 
       JOIN mmc.user_movie AS u
      WHERE m.id = u.movie_id
        AND u.user_id = $1`,
    [userID]
  );
}

export async function getMovieById(userID, movieID) {
  return await db.execQuery(
    `SELECT m.*
       FROM mmc.movie AS m
       JOIN mmc.user_movie AS u
      WHERE m.id = u.movie_id
        AND u.user_id = $1
        AND m.id = $2`,
    [userID, movieID]
  );
}

export async function getMovieGenres(userID, movieID) {
  return await db.execQuery(
    `SELECT g.genre
       FROM mmc.movie_genre AS g
       JOIN mmc.user_movie AS u
         ON g.movie_id = u.movie_id
        AND u.user_id = $1
        AND g.movie_id = $2`,
    [userID, movieID]
  );
}
