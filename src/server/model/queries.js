// This is an encapsulation of query strings into objects so that
// security can be more easily enabled per query
import { QUERY_STRINGS } from './query_strings';
export const QUERIES = {
  ADD_USER: {
    secured: false /* Does the query take a userID */,
    position: 0 /* What is the parameter position for the userID; 0 if none */,
    query: QUERY_STRINGS.ADD_USER /* What's the query text */,
  },
  GET_USER: {
    secured: false,
    position: 0,
    query: QUERY_STRINGS.GET_USER,
  },
  SELECT_ALL_GENRES: {
    secured: false,
    position: 0,
    query: QUERY_STRINGS.SELECT_ALL_GENRES,
  },
  SELECT_GENRE_MOVIES: {
    secured: true,
    position: 2,
    query: QUERY_STRINGS.SELECT_GENRE_MOVIES,
  },
  SELECT_ALL_TALENT: {
    secured: false,
    position: 0,
    query: QUERY_STRINGS.SELECT_ALL_TALENT,
  },
  SELECT_ONE_TALENT: {
    secured: false,
    position: 0,
    query: QUERY_STRINGS.SELECT_ONE_TALENT,
  },
  SELECT_TALENT_MOVIES: {
    secured: true,
    position: 2,
    query: QUERY_STRINGS.SELECT_TALENT_MOVIES,
  },
  INSERT_TALENT: {
    secured: false,
    position: 0,
    query: QUERY_STRINGS.INSERT_TALENT,
  },
  SELECT_ALL_MOVIES: {
    secured: true,
    position: 1,
    query: QUERY_STRINGS.SELECT_ALL_MOVIES,
  },
  SELECT_ONE_MOVIE: {
    secured: true,
    position: 2,
    query: QUERY_STRINGS.SELECT_ONE_MOVIE,
  },
  SELECT_MOVIE_GENRE: {
    secured: true,
    position: 2,
    query: QUERY_STRINGS.SELECT_MOVIE_GENRE,
  },
  SELECT_MOVIE_TALENT: {
    secured: true,
    position: 2,
    query: QUERY_STRINGS.SELECT_MOVIE_TALENT,
  },
  INSERT_MOVIE: {
    secured: true,
    position: 5,
    query: QUERY_STRINGS.INSERT_MOVIE,
  },
  UPDATE_MOVIE: {
    secured: true,
    position: 6,
    query: QUERY_STRINGS.UPDATE_MOVIE,
  },
  DELETE_MOVIE: {
    secured: true,
    position: 2,
    query: QUERY_STRINGS.DELETE_MOVIE,
  },
  ADD_TALENT_TO_MOVIE: {
    secured: true,
    position: 3,
    query: QUERY_STRINGS.ADD_TALENT_TO_MOVIE,
  },
  DELETE_TALENT_FROM_MOVIE: {
    secured: true,
    position: 3,
    query: QUERY_STRINGS.DELETE_TALENT_FROM_MOVIE,
  },
  ADD_GENRE_TO_MOVIE: {
    secured: true,
    position: 3,
    query: QUERY_STRINGS.ADD_GENRE_TO_MOVIE,
  },
  DELETE_GENRE_FROM_MOVIE: {
    secured: true,
    position: 3,
    query: QUERY_STRINGS.DELETE_GENRE_FROM_MOVIE,
  },
};
