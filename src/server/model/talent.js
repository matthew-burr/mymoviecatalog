// Talent.js
// Defines the Talent class/endpoint
import * as db from './db';

async function execQuery(query, params) {
  return await execQuery(query, params);
}

// Returns all talent
export async function getTalent() {
  return await db.execQuery('SELECT * FROM mmc.talent');
}

// Returns a single talent by matching their id
export async function getTalentById(id) {
  return await db.execQuery('SELECT * FROM mmc.talent WHERE id = $1', [id]);
}

// Returns all of the movies associated with a talent
export async function getTalentMovies(id) {
  return await db.execQuery(
    `SELECT m.id, m.title 
       FROM mmc.movie_talent AS t
       JOIN mmc.movie AS m
         ON t.movie_id = m.id
      WHERE t.talent_id = $1`,
    [id]
  );
}

// Adds a new Talent
export async function postTalent(talent) {
  return await db.execQuery(
    `INSERT INTO mmc.talent (first_name, last_name)
     VALUES($1, $2)
     RETURNING *`,
    [talent.first_name, talent.last_name]
  );
}
