'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;
exports.addUser = addUser;
exports.getUser = getUser;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

var _query_strings = require('./query_strings');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Functionality for managing users in the database
class User {
  async addUser(user) {
    return await db.execQuery(_query_strings.QUERY_STRINGS.ADD_USER, [user.email, user.first_name || '', user.last_name || '', user.password]);
  }

  async getUser(userID) {
    return await db.execQuery(_query_strings.QUERY_STRINGS.GET_USER, [userID]);
  }
}
exports.User = User;
async function addUser(user) {
  return await new User().addUser(user);
}

async function getUser(userID) {
  return await new User().getUser(userID);
}