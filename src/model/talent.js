// Talent.js
// Defines the Talent class/endpoint
import { Pool } from 'pg';

const CONN_STR = process.env.DATABASE_URL || 'postgres://@localhost/cs313';
const POOL = new Pool();

// Returns all talent
export async function getTalent() {
  let client = await POOL.connect();
  let data = await client.query('SELECT * FROM mmc.talent;');
  client.release();
  return data;
}

// Returns a single talent by matching their id
export async function getTalentById(id) {
  let client = await POOL.connect();
  let data = await client.query('SELECT * FROM mmc.talent WHERE id = $1', [id]);
  client.release();
  return data;
}

// Returns all of the movies associated with a talent
export async function getTalentMovies(id) {
  let client = await POOL.connect();
  let data = await client.query(
    'SELECT * FROM mmc.movie_talent WHERE talent_id = $1',
    [id]
  );
  client.release();
  return data;
}
