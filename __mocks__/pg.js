const pg = jest.genMockFromModule('pg');

let mockRows = [];
function __setRows(rows) {
  mockRows = rows;
}

class Pool {
  connect() {
    return new Client();
  }
}

class Client {
  async query(stmt, params) {
    let table = [];
    switch (true) {
      case /FROM mmc\.talent/.test(stmt):
        table = mockRows.talent;
        break;
      case /FROM mmc\.movie_talent/.test(stmt):
        table = mockRows.movie_talent;
        break;
      default:
        table = [];
    }

    return new Promise(resolve => {
      if (params) {
        let rows = table.filter(row => row.id == params[0]);
        resolve(rows);
      } else {
        resolve(table);
      }
    });
  }

  release() {}
}

pg.__setRows = __setRows;
pg.Pool = Pool;
pg.Client = Client;

module.exports = pg;
