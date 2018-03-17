const pg = jest.genMockFromModule('pg');

let mockRows = [];
let expectedQuery = '';
let sentExpectedQuery = false;
let queryHandler = function(query, params) {
  return { rows: [] };
};

function __setRows(rows) {
  mockRows = rows;
}
function __setQueryHandler(handler) {
  queryHandler = handler;
}
function __setExpectedQuery(query) {
  expectedQuery = query;
}
function wasExpectedQuery() {
  let tempSent = sentExpectedQuery;
  sentExpectedQuery = false;
  return tempSent;
}

class Pool {
  connect() {
    return new Client();
  }
}

class Client {
  async query(stmt, params) {
    sentExpectedQuery = stmt == expectedQuery;
    return new Promise(resolve => {
      resolve(queryHandler(stmt, params));
    });
  }

  release() {}
}

pg.__setRows = __setRows;
pg.__setQueryHandler = __setQueryHandler;
pg.__setExpectedQuery = __setExpectedQuery;
pg.wasExpectedQuery = wasExpectedQuery;
pg.Pool = Pool;
pg.Client = Client;

module.exports = pg;
