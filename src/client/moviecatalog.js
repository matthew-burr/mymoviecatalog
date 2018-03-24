import React from 'react';
import { Movie } from './movie';
import { Link } from 'react-router-dom';
import { WrappingLayout } from './components';

export default class MovieCatalog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { movies } = this.props;
    return (
      <WrappingLayout>
        {movies.map((movie, index) => (
          <Movie
            key={index}
            title={movie.title}
            poster={movie.poster ? movie.poster : 'images/noposter.jpg'}
          />
        ))}
        <Link to="/addmovie">Add</Link>
      </WrappingLayout>
    );
  }
}
