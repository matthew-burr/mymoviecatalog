// db.js
// Consolidates simple functions for querying the database
import { Pool } from 'pg';

const CONN_STR = process.env.DATABASE_URL || 'postgres://@localhost/cs313';
const POOL = new Pool({ connectionString: CONN_STR });

export async function execQuery(query, params) {
  let client = await POOL.connect();
  let data = await client.query(query, params);
  client.release();
  return data.rows;
}
