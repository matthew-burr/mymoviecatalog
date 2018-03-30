import * as db from './db';

export class Model {
  constructor(userID) {
    this.userID = userID || 1;
  }

  async execQuery(queryString, paramsArray) {
    return await db.execQueryForUser(this.userID, queryString, paramsArray);
  }
}
