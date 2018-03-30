'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execQuery = execQuery;
exports.execQueryForUser = execQueryForUser;

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

async function execQueryForUser(userID, query, params) {
  // This tacks the userID on as the first parameter to the query
  let localParams = params || [];
  if (query.secured) localParams.splice(query.position - 1, 0, userID);

  let client = await POOL.connect();
  let data = await client.query(query.query, localParams);
  client.release();
  return data.rows;
}