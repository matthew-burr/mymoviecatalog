'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTalent = getTalent;
exports.getTalentById = getTalentById;
exports.getTalentMovies = getTalentMovies;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

async function execQuery(query, params) {
  return await execQuery(query, params);
}

// Returns all talent
// Talent.js
// Defines the Talent class/endpoint
async function getTalent() {
  return await db.execQuery('SELECT * FROM mmc.talent');
}

// Returns a single talent by matching their id
async function getTalentById(id) {
  return await db.execQuery('SELECT * FROM mmc.talent WHERE id = $1', [id]);
}

// Returns all of the movies associated with a talent
async function getTalentMovies(id) {
  return await db.execQuery(`SELECT m.id, m.title 
       FROM mmc.movie_talent AS t
       JOIN mmc.movie AS m
         ON t.movie_id = m.id
      WHERE t.talent_id = $1`, [id]);
}