// Talent.js
// Defines the Talent class/endpoint
import * as db from './db';
import { QUERY_STRINGS } from './query_strings';

async function execQuery(query, params) {
  return await execQuery(query, params);
}

// Returns all talent
export async function getTalent() {
  return await db.execQuery(QUERY_STRINGS.SELECT_ALL_TALENT);
}

// Returns a single talent by matching their id
export async function getTalentById(id) {
  return await db.execQuery(QUERY_STRINGS.SELECT_ONE_TALENT, [id]);
}

// Returns all of the movies associated with a talent
export async function getTalentMovies(id) {
  return await db.execQuery(QUERY_STRINGS.SELECT_TALENT_MOVIES, [id]);
}

// Adds a new Talent
export async function postTalent(talent) {
  return await db.execQuery(QUERY_STRINGS.INSERT_TALENT, [
    talent.first_name,
    talent.last_name,
  ]);
}
