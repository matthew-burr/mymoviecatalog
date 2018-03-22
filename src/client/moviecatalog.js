import React from 'react';
import { Movie } from './movie';

export default class MovieCatalog extends React.Component {
  render() {
    let { movies } = this.props;
    return (
      <div>
        {movies.map((movie, index) => (
          <Movie key={index} title={movie.title} poster={movie.poster} />
        ))}
        <button type="button">Add</button>
      </div>
    );
  }
}
