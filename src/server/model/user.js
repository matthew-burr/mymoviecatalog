// Functionality for managing users in the database
import * as db from './db';
import { QUERY_STRINGS } from './query_strings';
import PropTypes from 'prop-types';

export async function addUser(user) {
  return await db.execQuery(QUERY_STRINGS.ADD_USER, [
    user.email,
    user.first_name || '',
    user.last_name || '',
    user.password,
  ]);
}

export async function getUser(userID) {
  return await db.execQuery(QUERY_STRINGS.GET_USER, [userID]);
}
