// Test the Talent functionality
jest.mock('pg');
import * as talent from '../talent.js';
import pg from 'pg';

describe('test the Talent endpoint', () => {
  const MOCK_DATA = {
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
    const data = await talent.getTalent();
    expect(data).not.toBeUndefined();
    expect(data).toHaveLength(MOCK_DATA.talent.length);
  });

  it('should get the right talent by id', async () => {
    const data = await talent.getTalentById(2);
    expect(data).toHaveLength(1);
    expect(data[0]).toEqual(MOCK_DATA.talent[1]);
  });

  it('should get the movies for the specified talent', async () => {
    const data = await talent.getTalentMovies(1);
    expect(data).toHaveLength(2);
    expect(data).toEqual(MOCK_DATA.movie_talent.filter(row => row.id == 1));
  });
});
