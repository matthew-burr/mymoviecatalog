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
export const ADD_MOVIE_SUCCESS = 'ADD_MOVIE_SUCESS';
export const ADD_MOVIE_FAILURE = 'ADD_MOVIE_FAILURE';
export function postNewMovie(movie) {
  return function(dispatch) {
    dispatch(addMovie(movie));
    fetch('/movies', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(addMovieSuccess(data[0]));
      });
  };
}
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
export function putUpdateMovie(movie) {
  return function(dispatch) {
    dispatch(updateMovie(movie.id, movie));
    return fetch(`/movies/${movie.id}`, {
      method: 'PUT',
      body: JSON.stringify(movie),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(updateMovieSuccess(data[0]));
      });
  };
}
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
export function sendDeleteMovie(movie) {
  return function(dispatch) {
    dispatch(deleteMovie(movie.id));
    fetch(`/movies/${movie.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'content-type': 'application/json',
      }),
    }).then(response => {
      if (response.ok) {
        dispatch(deleteMovieSuccess(movie.id));
      }
    });
  };
}
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

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export function postNewUser(user) {
  return function(dispatch) {
    dispatch(createUser(user));
    fetch('/user', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => {
        dispatch(createUserSuccess(data.token, data.user));
      });
  };
}
export function createUser(user) {
  return {
    type: CREATE_USER,
    user: user,
  };
}
export function createUserSuccess(token, user) {
  return {
    type: CREATE_USER_SUCCESS,
    user: user,
    token: token,
  };
}
export function createUserFailure(status, error) {
  return {
    type: CREATE_USER_FAILURE,
    status: status,
    error: error,
  };
}

export const LOGIN = 'LOGGING_IN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export function postLogin(email, password) {
  return function(dispatch) {
    dispatch(login());
    fetch('/log_in', {
      method: 'POST',
      body: JSON.stringify({ username: email, password: password }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .then(data => {
        dispatch(loginSuccess(data.token, data.user));
      });
  };
}
export function login() {
  return {
    type: LOGIN,
  };
}
export function loginSuccess(token, user) {
  console.log(user);
  return {
    type: LOGIN_SUCCESS,
    user: user,
    token: token,
  };
}
export function loginFailure(status, error) {
  return {
    type: LOGIN_FAILURE,
    status: status,
    error: error,
  };
}
