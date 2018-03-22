import { ADD_MOVIE, UPDATE_MOVIE, DELETE_MOVIE } from './actions';

/* Initial state */
const initialCatalogState = {
  movies: [{ title: 'The Godfather' }, { title: 'The Godfather: Part II' }],
};

export function movieCatalog(state = initialCatalogState, action) {
  switch (action.type) {
    case ADD_MOVIE:
      return Object.assign({}, state, {
        movies: [...state.movies, action.movie],
      });
    case UPDATE_MOVIE:
      return Object.assign({}, state, {
        movies: state.movies.map((movie, id) => {
          if (id === action.movieID) {
            return action.movie;
          }

          return movie;
        }),
      });
    case DELETE_MOVIE:
      return Object.assign({}, state, {
        movies: state.movies.filter((movie, index) => index != action.movieID),
      });
    default:
      return state;
  }
}
