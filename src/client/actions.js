// React Redux Actions for My Movie Catalog
export const GET_MOVIES = 'GET_MOVIES';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE';
export function fetchAllMovies(dispatch) {
  return function(dispatch) {
    dispatch(getMovies());
    return fetch('/movies')
      .then(res => res.json())
      .then(movies => dispatch(getMoviesSuccess(movies)));
  };
}
export function getMovies() {
  return {
    type: GET_MOVIES,
  };
}
export function getMoviesSuccess(movies) {
  return {
    type: GET_MOVIES_SUCCESS,
    movies: movies,
  };
}
export function getMoviesFailure(status, error) {
  return {
    type: GET_MOVIES_FAILURE,
    status: status,
    error: error,
  };
}

export const SELECT_MOVIE = 'SELECT_MOVIE';
export function selectMovie(movie) {
  return {
    type: SELECT_MOVIE,
    movie: movie,
  };
}

export const ADD_MOVIE = 'ADD_MOVIE';
export const ADD_MOVIE_SUCESS = 'ADD_MOVIE_SUCESS';
export const ADD_MOVIE_FAILURE = 'ADD_MOVIE_FAILURE';
export function addMovie(movie) {
  return {
    type: ADD_MOVIE,
    movie: movie,
  };
}
export function addMovieSuccess(movie) {
  return {
    type: ADD_MOVIE_SUCCESS,
    movie: movie,
  };
}
export function addMovieFailure(status, error) {
  return {
    type: ADD_MOVIE_FAILURE,
    status: status,
    error: error,
  };
}

export const UPDATE_MOVIE = 'UPDATE_MOVIE';
export const UPDATE_MOVIE_SUCCESS = 'UPDATE_MOVIE_SUCCESS';
export const UPDATE_MOVIE_FAILURE = 'UPDATE_MOVIE_FAILURE';
export function updateMovie(movieID, movie) {
  return {
    type: UPDATE_MOVIE,
    movieID: movieID,
    updatedMovie: movie,
  };
}
export function updateMovieSuccess(movie) {
  return {
    type: UPDATE_MOVIE_SUCCESS,
    movie: movie,
  };
}
export function updateMovieFailure(status, error) {
  return {
    type: UPDATE_MOVIE_FAILURE,
    status: status,
    error: error,
  };
}

export const DELETE_MOVIE = 'DELETE_MOVIE';
export const DELETE_MOVIE_SUCCESS = 'DELETE_MOVIE_SUCCESS';
export const DELETE_MOVIE_FAILURE = 'DELETE_MOVIE_FAILURE';
export function deleteMovie(movieID) {
  return {
    type: DELETE_MOVIE,
    movieID: movieID,
  };
}
export function deleteMovieSuccess(movieID) {
  return {
    type: DELETE_MOVIE_SUCCESS,
    movieID: movieID,
  };
}
export function deleteMovieFailure(status, error) {
  return {
    type: DELETE_MOVIE_FAILURE,
    status: status,
    error: error,
  };
}
