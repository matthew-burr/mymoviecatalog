// Test the Genre functionality
jest.mock('pg');
import * as genre from '../genre.js';
import pg from 'pg';

describe('the core Genre functionality', () => {
  const MOCK_DATA = {
    genres: [
      { genre: 'Action' },
      { genre: 'Comedy' },
      { genre: 'Documentary' },
      { genre: 'Drama' },
    ],
    movie_genre: [
      {
        movie_id: 1,
        genre: 'Comedy',
      },
      {
        movie_id: 2,
        genre: 'Action',
      },
      {
        movie_id: 2,
        genre: 'Comedy',
      },
    ],
  };

  beforeAll(() => pg.__setRows(MOCK_DATA));

  it('should return all the genres when you call getGenres', async () => {
    pg.__setQueryHandler(() => {
      return { rows: MOCK_DATA.genres };
    });
    const data = await genre.getGenres();
    expect(data).toHaveLength(4);
    expect(data).toEqual(MOCK_DATA.genres);
  });

  it('should return only the movies for the specified Genre', async () => {
    pg.__setQueryHandler((stmt, params) => {
      return {
        rows: MOCK_DATA.movie_genre.filter(row => row.genre == params[0]),
      };
    });
    let data = await genre.getGenreMovies('Comedy');
    expect(data).toHaveLength(2);
    expect(data).toEqual(
      MOCK_DATA.movie_genre.filter(row => row.genre == 'Comedy')
    );
    data = await genre.getGenreMovies('Action');
    expect(data).toHaveLength(1);
    expect(data).toEqual(
      MOCK_DATA.movie_genre.filter(row => row.genre == 'Action')
    );
  });
});
