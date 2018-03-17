// Test the Talent functionality
jest.mock('pg');
import * as talent from '../talent.js';
import pg from 'pg';

describe('test the Talent endpoint', () => {
  let MOCK_DATA = {
    talent: [
      { id: 1, first_name: 'Matthew', last_name: 'Burr' },
      { id: 2, first_name: 'Amy', last_name: 'Burr' },
    ],
    movie_talent: [
      { movie_id: 1, id: 1 },
      { movie_id: 2, id: 1 },
      { movie_id: 1, id: 2 },
    ],
  };

  beforeEach(() => {
    pg.__setRows(MOCK_DATA);
  });

  it('should get all talent when you call getTalent', async () => {
    pg.__setQueryHandler(() => {
      return { rows: MOCK_DATA.talent };
    });
    const data = await talent.getTalent();
    expect(data).not.toBeUndefined();
    expect(data).toHaveLength(MOCK_DATA.talent.length);
  });

  it('should get the right talent by id', async () => {
    pg.__setQueryHandler((stmt, params) => {
      let rows = MOCK_DATA.talent.filter(row => row.id == params[0]);
      return { rows: rows };
    });
    const data = await talent.getTalentById(2);
    expect(data).toHaveLength(1);
    expect(data[0]).toEqual(MOCK_DATA.talent[1]);
  });

  it('should get the movies for the specified talent', async () => {
    pg.__setQueryHandler((stmt, params) => {
      let rows = MOCK_DATA.movie_talent.filter(row => row.id == params[0]);
      return { rows: rows };
    });
    const data = await talent.getTalentMovies(1);
    expect(data).toHaveLength(2);
    expect(data).toEqual(MOCK_DATA.movie_talent.filter(row => row.id == 1));
  });

  it('should add a new talent and return its id', async () => {
    pg.__setQueryHandler((stmt, params) => {
      return { rows: [{ id: 3, first_name: params[0], last_name: params[1] }] };
    });
    const data = await talent.postTalent({
      first_name: 'Chris',
      last_name: 'Evans',
    });
    expect(data).toHaveLength(1);
    expect(data).toEqual([
      {
        id: 3,
        first_name: 'Chris',
        last_name: 'Evans',
      },
    ]);
  });
});
