// Test the user queries
jest.mock('pg');
import * as user from '../user.js';
import { QUERY_STRINGS } from '../query_strings';
import pg from 'pg';

describe('how a user object works', () => {
  it('adds a user when we tell it to', async () => {
    let rows = [];
    pg.__setExpectedQuery(QUERY_STRINGS.ADD_USER);
    pg.__setQueryHandler((query, params) => {
      rows = [
        {
          id: 1,
          email: params[0],
          first_name: params[1],
          last_name: params[2],
          password: params[3],
        },
      ];

      return {
        rows: rows.map(row => ({
          id: row.id,
        })),
      };
    });
    let data = await user.addUser({
      email: 'matt.d.burr@gmail.com',
      first_name: 'Matt',
      last_name: 'Burr',
      password: 'not_real',
    });

    expect(data[0]).toEqual({ id: 1 });
    expect(pg.wasExpectedQuery()).toBeTruthy();
    expect(rows[0]).toEqual({
      id: 1,
      email: 'matt.d.burr@gmail.com',
      first_name: 'Matt',
      last_name: 'Burr',
      password: 'not_real',
    });
  });

  it('gets the user when requested', async () => {
    const MOCK_DATA = [
      {
        id: 1,
        email: 'matt.d.burr@gmail.com',
        first_name: 'Matt',
        last_name: 'Burr',
        password: 'not_real',
      },
      {
        id: 2,
        email: 'amy@mail.com',
        first_name: 'Amy',
        last_name: 'Burr',
        password: 'fake',
      },
    ];
    pg.__setExpectedQuery(QUERY_STRINGS.GET_USER);
    pg.__setQueryHandler((query, params) => {
      console.log(params[0]);
      console.log(params);
      return { rows: MOCK_DATA.filter(row => row.id == params[0]) };
    });

    let data = await user.getUser(2);
    expect(data).toEqual([
      {
        id: 2,
        email: 'amy@mail.com',
        first_name: 'Amy',
        last_name: 'Burr',
        password: 'fake',
      },
    ]);
  });
});
