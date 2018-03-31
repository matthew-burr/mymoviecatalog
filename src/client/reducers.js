// Redux Reducers for My Movie Catalog
import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_MOVIES,
  DELETE_MOVIE_FAILURE,
  DELETE_MOVIE,
  DELETE_MOVIE_SUCCESS,
  ADD_MOVIE,
  ADD_MOVIE_FAILURE,
  ADD_MOVIE_SUCESS,
  UPDATE_MOVIE,
  UPDATE_MOVIE_FAILURE,
  UPDATE_MOVIE_SUCCESS,
  SELECT_MOVIE,
} from './actions';
import { combineReducers } from 'redux';

const initialState = {
  movieCatalog: {
    movies: [],
    isFetching: false,
    isInvalid: false,
  },
  currentMovie: {
    movie: {},
  },
};

const myMovieCatalog = combineReducers({
  movieCatalog,
  currentMovie,
});

export default myMovieCatalog;

function movieCatalog(
  state = { isFetching: false, isInvalid: false, movies: [] },
  action
) {
  switch (action.type) {
    case GET_MOVIES:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_MOVIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        movies: action.movies,
      });
    case GET_MOVIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case ADD_MOVIE:
      return Object.assign({}, state, {
        isFetching: true,
        isInvalid: true,
      });
    case ADD_MOVIE_SUCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isInvalid: false,
        movies: [...state.movies, action.movie],
      });
    case ADD_MOVIE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isInvalid: false,
      });
    case DELETE_MOVIE:
      return Object.assign({}, state, {
        isFetching: true,
        isInvalid: true,
      });
    case DELETE_MOVIE_SUCCESS:
      let newMovies = state.movies;
      let deletedMovieIndex = newMovies.findIndex(
        movie => movie.id === action.movieID
      );
      newMovies.splice(deletedMovieIndex, 1);
      return Object.assign({}, state, {
        isFetching: false,
        isInvalid: false,
        movies: newMovies,
      });
    case DELETE_MOVIE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isInvalid: false,
      });
    case UPDATE_MOVIE:
      return Object.assign({}, state, {
        isFetching: true,
        isInvalid: true,
      });
    case UPDATE_MOVIE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isInvalid: false,
        movies: state.movies.map(movie => {
          if (movie.id === action.movie.id) return action.movie;
          return movie;
        }),
      });
    case UPDATE_MOVIE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isInvalid: false,
      });

    default:
      return state;
  }
}

function currentMovie(state = { movie: {} }, action) {
  switch (action.type) {
    case SELECT_MOVIE:
      return Object.assign({}, state, {
        movie: action.movie,
      });
    default:
      return state;
  }
}
