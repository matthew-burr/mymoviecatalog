// Test the Movie functionality
jest.mock('pg');
import * as movie from '../movie.js';
import pg from 'pg';

describe('the core Movie functionality', () => {
  const MOCK_DATA = {
    movies: [
      { id: 1, user_id: 1, title: 'Captain America' },
      { id: 2, user_id: 1, title: 'Thor' },
      { id: 3, user_id: 2, title: 'Avengers' },
    ],
    movie_genre: [
      {
        movie_id: 1,
        user_id: 1,
        genres: [{ genre: 'Action' }, { genre: 'Drama' }],
      },
      { movie_id: 2, user_id: 1, genres: [{ genre: 'Action' }] },
      {
        movie_id: 3,
        user_id: 2,
        genres: [{ genre: 'Action' }, { genre: 'Comedy' }],
      },
    ],
  };

  beforeAll(() => {
    pg.__setRows(MOCK_DATA);
  });
  it('should get all movies belonging to the current user when you call getMovies', async () => {
    pg.__setQueryHandler((stmt, params) => {
      return { rows: MOCK_DATA.movies.filter(row => row.user_id == params[0]) };
    });
    let data = await movie.getMovies(1);
    expect(data).toHaveLength(2);
    expect(data).toEqual(MOCK_DATA.movies.filter(row => row.user_id == 1));

    data = await movie.getMovies(2);
    expect(data).toHaveLength(1);
    expect(data).toEqual(MOCK_DATA.movies.filter(row => row.user_id == 2));
  });

  it('should get a specific movie belonging to the current user when you call getMovieById', async () => {
    pg.__setQueryHandler((stmt, params) => {
      return {
        rows: MOCK_DATA.movies.filter(
          row => row.user_id == params[0] && row.id == params[1]
        ),
      };
    });
    let data = await movie.getMovieById(1 /* user id */, 1 /* movie id */);
    expect(data).toHaveLength(1);
    expect(data).toEqual([{ id: 1, user_id: 1, title: 'Captain America' }]);

    data = await movie.getMovieById(2, 3);
    expect(data).toHaveLength(1);
    expect(data).toEqual([{ id: 3, user_id: 2, title: 'Avengers' }]);
  });

  it("should get the list of genres associated with the current user's movie when you call getMovieGenres", async () => {
    pg.__setQueryHandler((stmt, params) => {
      return {
        rows: MOCK_DATA.movie_genre.filter(
          row => row.user_id == params[0] && row.movie_id == params[1]
        )[0].genres,
      };
    });
    let data = await movie.getMovieGenres(1 /* user id */, 1 /* movie id */);
    expect(data).toHaveLength(2);
    expect(data).toEqual([{ genre: 'Action' }, { genre: 'Drama' }]);

    data = await movie.getMovieGenres(2, 3);
    expect(data).toHaveLength(2);
    expect(data).toEqual([{ genre: 'Action' }, { genre: 'Comedy' }]);
  });
});
