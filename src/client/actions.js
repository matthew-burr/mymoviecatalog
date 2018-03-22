/* Action types & Creators */

/* Movie Actions */
export const ADD_MOVIE = 'ADD_MOVIE';
export const UPDATE_MOVIE = 'UPDATE_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';

export function addMovie(movie) {
  return {
    type: ADD_MOVIE,
    movie: movie,
  };
}

export function updateMovie(movieID, movie) {
  return {
    type: UPDATE_MOVIE,
    movieID: movieID,
    movie: movie,
  };
}

export function deleteMovie(movieID) {
  return {
    type: DELETE_MOVIE,
    movieID: movieID,
  };
}

/* Movie Catalog Actions */
export const GETTING_MOVIES = 'GETTING_MOVIES';
export const GOT_MOVIES = 'GOT_MOVIES';
