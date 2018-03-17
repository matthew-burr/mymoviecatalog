// Test the Movie functionality
jest.mock('pg');
import * as movie from '../movie.js';
import pg from 'pg';

describe('the core Movie functionality', () => {
  const MOCK_DATA = {
    movies: [
      { id: 1, title: 'Captain America' },
      { id: 2, title: 'Thor' },
      { id: 3, title: 'Avengers' },
    ],
    movie_genre: [
      {
        movie_id: 1,
        genres: [{ genre: 'Action' }, { genre: 'Drama' }],
      },
      { movie_id: 2, genres: [{ genre: 'Action' }] },
      {
        movie_id: 3,
        genres: [{ genre: 'Action' }, { genre: 'Comedy' }],
      },
    ],
    movie_talent: [
      {
        movie_id: 1,
        talent: [{ id: 1, name: 'Chris Evans' }],
      },
      {
        movie_id: 2,
        talent: [{ id: 2, name: 'Chris Hemsworth' }],
      },
      {
        movie_id: 3,
        talent: [
          { id: 1, name: 'Chris Evans' },
          { id: 2, name: 'Chris Hemsworth' },
        ],
      },
    ],
  };

  beforeAll(() => {
    pg.__setRows(MOCK_DATA);
  });
  it('should get all movies when you call getMovies', async () => {
    pg.__setQueryHandler((stmt, params) => {
      return { rows: MOCK_DATA.movies };
    });
    const data = await movie.getMovies();
    expect(data).toHaveLength(3);
    expect(data).toEqual(MOCK_DATA.movies);
  });

  it('should get a specific movie when you call getMovieById', async () => {
    pg.__setQueryHandler((stmt, params) => {
      return {
        rows: MOCK_DATA.movies.filter(row => row.id == params[0]),
      };
    });
    let data = await movie.getMovieById(1);
    expect(data).toHaveLength(1);
    expect(data).toEqual([{ id: 1, title: 'Captain America' }]);

    data = await movie.getMovieById(3);
    expect(data).toHaveLength(1);
    expect(data).toEqual([{ id: 3, title: 'Avengers' }]);
  });

  it("should get the list of genres associated with the current user's movie when you call getMovieGenres", async () => {
    pg.__setQueryHandler((stmt, params) => {
      return {
        rows: MOCK_DATA.movie_genre.filter(row => row.movie_id == params[0])[0]
          .genres,
      };
    });
    let data = await movie.getMovieGenres(1 /* movie id */);
    expect(data).toHaveLength(2);
    expect(data).toEqual([{ genre: 'Action' }, { genre: 'Drama' }]);

    data = await movie.getMovieGenres(3);
    expect(data).toHaveLength(2);
    expect(data).toEqual([{ genre: 'Action' }, { genre: 'Comedy' }]);
  });

  it('should get the list of talent associated with the movie when you call getMovieTalent', async () => {
    pg.__setQueryHandler((stmt, params) => {
      return {
        rows: MOCK_DATA.movie_talent.filter(row => row.movie_id == params[0])[0]
          .talent,
      };
    });
    let data = await movie.getMovieTalent(1);
    expect(data).toHaveLength(1);
    expect(data).toEqual([{ id: 1, name: 'Chris Evans' }]);

    data = await movie.getMovieTalent(3);
    expect(data).toHaveLength(2);
    expect(data).toEqual([
      { id: 1, name: 'Chris Evans' },
      { id: 2, name: 'Chris Hemsworth' },
    ]);
  });

  it('should add a new movie with you call postMovie', async () => {
    pg.__setQueryHandler((stmt, params) => {
      return {
        rows: [{ id: 10, title: params[0] }],
      };
    });
    let data = await movie.postMovie({ title: 'The Last of the Mohicans' });
    expect(data).toHaveLength(1);
    expect(data).toEqual([{ id: 10, title: 'The Last of the Mohicans' }]);
  });
});
