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
    'SELECT * FROM mmc.movie_talent WHERE talent_id = $1',
    [id]
  );
}
