// Test the Movie functionality
jest.mock('pg');
import * as movie from '../movie.js';
import { QUERY_STRINGS } from '../query_strings';
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
    pg.__setExpectedQuery(QUERY_STRINGS.SELECT_ALL_MOVIES);
    const data = await movie.getMovies();
    expect(pg.wasExpectedQuery()).toBeTruthy();
    expect(data).toHaveLength(3);
    expect(data).toEqual(MOCK_DATA.movies);
  });

  it('should get a specific movie when you call getMovieById', async () => {
    pg.__setQueryHandler((stmt, params) => {
      return {
        rows: MOCK_DATA.movies.filter(row => row.id == params[0]),
      };
    });
    pg.__setExpectedQuery(QUERY_STRINGS.SELECT_ONE_MOVIE);
    let data = await movie.getMovieById(1);
    expect(pg.wasExpectedQuery()).toBeTruthy();
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
    pg.__setExpectedQuery(QUERY_STRINGS.SELECT_MOVIE_GENRE);
    let data = await movie.getMovieGenres(1 /* movie id */);
    expect(pg.wasExpectedQuery()).toBeTruthy();
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
    pg.__setExpectedQuery(QUERY_STRINGS.SELECT_MOVIE_TALENT);
    let data = await movie.getMovieTalent(1);
    expect(pg.wasExpectedQuery()).toBeTruthy();
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
        rows: [
          {
            id: 10,
            title: params[0],
            release_year: params[1],
            rating: params[2],
            poster: params[3],
          },
        ],
      };
    });
    pg.__setExpectedQuery(QUERY_STRINGS.INSERT_MOVIE);
    let data = await movie.postMovie({
      title: 'The Last of the Mohicans',
      release_year: 1993,
      rating: 'PG-13',
      poster: 'anything',
    });
    expect(pg.wasExpectedQuery()).toBeTruthy();
    expect(data).toHaveLength(1);
    expect(data).toEqual([
      {
        id: 10,
        title: 'The Last of the Mohicans',
        release_year: 1993,
        rating: 'PG-13',
        poster: 'anything',
      },
    ]);
  });

  it('should provide default values if fields are blank when you call postMovie', async () => {
    pg.__setQueryHandler((stmt, params) => {
      return {
        rows: [
          {
            id: 10,
            title: params[0],
            release_year: params[1],
            rating: params[2],
            poster: params[3],
          },
        ],
      };
    });
    pg.__setExpectedQuery(QUERY_STRINGS.INSERT_MOVIE);
    let data = await movie.postMovie({
      title: 'The Last of the Mohicans',
    });
    expect(pg.wasExpectedQuery()).toBeTruthy();
    expect(data).toHaveLength(1);
    expect(data).toEqual([
      {
        id: 10,
        title: 'The Last of the Mohicans',
        release_year: null,
        rating: null,
        poster: null,
      },
    ]);
  });

  it('should update the movie when you call putMovie', async () => {
    pg.__setExpectedQuery(QUERY_STRINGS.UPDATE_MOVIE);
    pg.__setQueryHandler((stmt, params) => {
      return {
        rows: [
          {
            id: params[0],
            title: params[1],
            release_year: params[2],
            rating: params[3],
            poster: params[4],
          },
        ],
      };
    });
    let data = await movie.putMovie(10, {
      title: 'The Last Starfighter',
      release_year: 1986,
      rating: 'PG',
      poster: 'unknown',
    });
    expect(pg.wasExpectedQuery()).toBeTruthy();
    expect(data).toEqual([
      {
        id: 10,
        title: 'The Last Starfighter',
        release_year: 1986,
        rating: 'PG',
        poster: 'unknown',
      },
    ]);
  });

  it('should update with default values if they are missing when you call putMovie', async () => {
    pg.__setExpectedQuery(QUERY_STRINGS.UPDATE_MOVIE);
    pg.__setQueryHandler((stmt, params) => {
      return {
        rows: [
          {
            id: params[0],
            title: params[1],
            release_year: params[2],
            rating: params[3],
            poster: params[4],
          },
        ],
      };
    });
    let data = await movie.putMovie(10, {
      title: 'The Last Starfighter',
    });
    expect(pg.wasExpectedQuery()).toBeTruthy();
    expect(data).toEqual([
      {
        id: 10,
        title: 'The Last Starfighter',
        release_year: null,
        rating: null,
        poster: null,
      },
    ]);
  });

  it('should delete the movie when you call deleteMovie', async () => {
    pg.__setExpectedQuery(QUERY_STRINGS.DELETE_MOVIE);
    let test_data = [
      { id: 1, title: 'Captain America' },
      { id: 2, title: 'Winter Soldier' },
    ];
    pg.__setQueryHandler((stmt, params) => {
      let i = test_data.findIndex(row => row.id == params[0]);
      test_data.splice(i, 1);
      return [];
    });
    let data = await movie.deleteMovie(2);
    expect(pg.wasExpectedQuery()).toBeTruthy();
    expect(test_data).toHaveLength(1);
    expect(test_data).not.toContainEqual({ id: 2, title: 'Captain America' });
  });

  it('should add the talent to the movie', async () => {
    pg.__setExpectedQuery(QUERY_STRINGS.ADD_TALENT_TO_MOVIE);
    pg.__setQueryHandler((stmt, params) => {
      return { rows: [{ movie_id: params[0], talent_id: params[1] }] };
    });
    let data = await movie.addTalentToMovie(2, 3);
    expect(pg.wasExpectedQuery()).toBeTruthy();
    expect(data).toHaveLength(1);
    expect(data).toEqual([{ movie_id: 2, talent_id: 3 }]);
  });

  it('should delete the talent from the movies', async () => {
    pg.__setExpectedQuery(QUERY_STRINGS.DELETE_TALENT_FROM_MOVIE);
    let test_data = [
      { movie_id: 1, talent_id: 1 },
      { movie_id: 1, talent_id: 2 },
    ];
    pg.__setQueryHandler((stmt, params) => {
      let i = test_data.findIndex(
        row => row.movie_id == params[0] && row.talent_id == params[1]
      );
      test_data.splice(i, 1);
      return [];
    });
    let data = await movie.deleteTalentFromMovie(1, 2);
    expect(pg.wasExpectedQuery()).toBeTruthy();
    expect(test_data).toHaveLength(1);
    expect(test_data).not.toContainEqual({ movie_id: 1, talent_id: 2 });
  });

  it('should add the talent to the movie', async () => {
    pg.__setExpectedQuery(QUERY_STRINGS.ADD_GENRE_TO_MOVIE);
    pg.__setQueryHandler((stmt, params) => {
      return { rows: [{ movie_id: params[0], genre: params[1] }] };
    });
    let data = await movie.addGenreToMovie(1, 'comedy');
    expect(pg.wasExpectedQuery()).toBeTruthy();
    expect(data).toHaveLength(1);
    expect(data).toEqual([{ movie_id: 1, genre: 'comedy' }]);
  });

  it('should delete the talent from the movie', async () => {
    pg.__setExpectedQuery(QUERY_STRINGS.DELETE_GENRE_FROM_MOVIE);
    let test_data = [
      { movie_id: 1, genre: 'comedy' },
      { movie_id: 1, genre: 'action' },
    ];
    pg.__setQueryHandler((stmt, params) => {
      let i = test_data.findIndex(
        row => row.movie_id == params[0] && row.genre == params[1]
      );
      test_data.splice(i, 1);
      return [];
    });
    let data = await movie.deleteGenreFromMovie(1, 'action');
    expect(pg.wasExpectedQuery()).toBeTruthy();
    expect(test_data).toHaveLength(1);
    expect(test_data).not.toContainEqual({ movie_id: 1, genre: 'action' });
  });
});
