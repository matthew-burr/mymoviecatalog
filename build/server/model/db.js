'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execQuery = execQuery;

var _pg = require('pg');

const CONN_STR = process.env.DATABASE_URL || 'postgres://@localhost/cs313'; // db.js
// Consolidates simple functions for querying the database

const POOL = new _pg.Pool({ connectionString: CONN_STR });

async function execQuery(query, params) {
  let client = await POOL.connect();
  let data = await client.query(query, params);
  client.release();
  return data.rows;
}