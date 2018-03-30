'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = undefined;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class Model {
  constructor(userID) {
    this.userID = userID || 1;
  }

  async execQuery(queryString, paramsArray) {
    return await db.execQueryForUser(this.userID, queryString, paramsArray);
  }
}
exports.Model = Model;