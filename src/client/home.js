import React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { Movie } from './movie';
import PropTypes from 'prop-types';
import { movieCatalog } from './reducers';
import { addMovie } from './actions';

let store = createStore(movieCatalog);

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie, id) => {
        return (
          <Movie key={id} title={movie.title} poster="images/noposter.jpg" />
        );
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
