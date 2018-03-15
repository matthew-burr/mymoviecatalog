const pg = jest.genMockFromModule('pg');

let mockRows = [];
let queryHandler = function(query, params) {
  return { rows: [] };
};

function __setRows(rows) {
  mockRows = rows;
}
function __setQueryHandler(handler) {
  queryHandler = handler;
}

class Pool {
  connect() {
    return new Client();
  }
}

class Client {
  async query(stmt, params) {
    return new Promise(resolve => {
      resolve(queryHandler(stmt, params));
    });
  }

  release() {}
}

pg.__setRows = __setRows;
pg.__setQueryHandler = __setQueryHandler;
pg.Pool = Pool;
pg.Client = Client;

module.exports = pg;
