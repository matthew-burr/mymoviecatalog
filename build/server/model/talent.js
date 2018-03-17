'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTalent = getTalent;
exports.getTalentById = getTalentById;
exports.getTalentMovies = getTalentMovies;
exports.postTalent = postTalent;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

var _query_strings = require('./query_strings');

var QUERY_STRINGS = _interopRequireWildcard(_query_strings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Talent.js
// Defines the Talent class/endpoint
async function execQuery(query, params) {
  return await execQuery(query, params);
}

// Returns all talent
async function getTalent() {
  return await db.execQuery(QUERY_STRINGS.SELECT_ALL_TALENT);
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

// Adds a new Talent
async function postTalent(talent) {
  return await db.execQuery(`INSERT INTO mmc.talent (first_name, last_name)
     VALUES($1, $2)
     RETURNING *`, [talent.first_name, talent.last_name]);
}