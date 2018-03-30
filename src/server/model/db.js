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

export async function execQueryForUser(userID, query, params) {
  // This tacks the userID on as the first parameter to the query
  let localParams = params || [];
  if (query.secured) localParams.splice(query.position - 1, 0, userID);

  let client = await POOL.connect();
  let data = await client.query(query.query, localParams);
  client.release();
  return data.rows;
}
