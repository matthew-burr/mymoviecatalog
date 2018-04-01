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
  ADD_MOVIE_SUCCESS,
  UPDATE_MOVIE,
  UPDATE_MOVIE_FAILURE,
  UPDATE_MOVIE_SUCCESS,
  SELECT_MOVIE,
  CREATE_USER_SUCCESS,
  LOGIN_SUCCESS,
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
  user,
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
    case ADD_MOVIE_SUCCESS:
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
      let deletedMovieIndex = state.movies.findIndex(
        movie => movie.id === action.movieID
      );
      return Object.assign({}, state, {
        isFetching: false,
        isInvalid: false,
        movies: [
          ...state.movies.slice(0, deletedMovieIndex),
          ...state.movies.slice(deletedMovieIndex + 1),
        ],
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
    case DELETE_MOVIE_SUCCESS:
      return Object.assign({}, state, {
        movie: {},
      });
    default:
      return state;
  }
}

function user(
  state = { email: '', first_name: '', last_name: '', token: '' },
  action
) {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return Object.assign({}, state, {
        email: action.user.email,
        first_name: action.user.first_name,
        last_name: action.user.last_name,
        token: action.token,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        email: action.user.email,
        first_name: action.user.first_name,
        last_name: action.user.last_name,
        token: action.token,
      });
    default:
      return state;
  }
}
