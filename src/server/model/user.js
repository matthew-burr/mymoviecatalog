// Functionality for managing users in the database
import * as db from './db';
import { QUERY_STRINGS } from './query_strings';
import PropTypes from 'prop-types';
import pg from 'pg';

export class User {
  async addUser(user) {
    return await db.execQuery(QUERY_STRINGS.ADD_USER, [
      user.email,
      user.first_name || '',
      user.last_name || '',
      user.password,
    ]);
  }

  async getUser(userID) {
    return await db.execQuery(QUERY_STRINGS.GET_USER, [userID]);
  }
}
export async function addUser(user) {
  return await new User().addUser(user);
}

export async function getUser(userID) {
  return await new User().getUser(userID);
}
