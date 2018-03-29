'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUser = addUser;

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _query_strings = require('./query_strings');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addUser(user) {
  return;
} // Functionality for managing users in the database


addUser.propTypes = {
  user: _propTypes2.default.shape({
    email: _propTypes2.default.string.isRequired,
    first_name: _propTypes2.default.string,
    last_name: _propTypes2.default.string,
    password: _propTypes2.default.string.isRequired
  }).isRequired
};