import React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';

/* Action types */
const ADD_MOVIE = 'ADD_MOVIE';
const UPDATE_MOVIE = 'UPDATE_MOVIE';
const DELETE_MOVIE = 'DELETE_MOVIE';

/* Action creators */
function addMovie(movie) {
  return {
    type: ADD_MOVIE,
    movie: movie,
  };
}

function updateMovie(movieID, movie) {
  return {
    type: UPDATE_MOVIE,
    movieID: movieID,
    movie: movie,
  };
}

function deleteMovie(movieID) {
  return {
    type: DELETE_MOVIE,
    movieID: movieID,
  };
}

/* Initial state */
const initialCatalogState = {
  movies: [{ title: 'The Godfather' }, { title: 'The Godfather: Part II' }],
};

function movieCatalog(state = initialCatalogState, action) {
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

let store = createStore(movieCatalog);

const Movie = ({ movie }) => {
  return <li>{movie.title}</li>;
};

Movie.propTypes = {
  movie: PropTypes.shape({ title: PropTypes.string.isRequired }),
};

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie, id) => {
        return <Movie key={id} movie={movie} />;
      })}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string.isRequired })
  ).isRequired,
};

let AddMovie = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) return;
          dispatch(addMovie({ title: input.value }));
          input.value = '';
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
AddMovie = connect()(AddMovie);

const mapStateToProps = state => {
  return { movies: state.movies };
};

const MovieCatalog = connect(mapStateToProps)(MovieList);

const HomeContent = () => (
  <div>
    <MovieCatalog />
    <AddMovie />
  </div>
);

export default function Home(props) {
  return (
    <Provider store={store}>
      <HomeContent />
    </Provider>
  );
}
