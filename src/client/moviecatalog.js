import React from 'react';
import { Movie } from './movie';

export default class MovieCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  componentDidMount() {
    fetch('/movies')
      .then(results => {
        return results.json();
      })
      .then(movies => {
        this.setState({ movies: movies });
      })
      .catch(err => console.log(err));
  }

  render() {
    let { movies } = this.state;
    return (
      <div>
        {movies.map((movie, index) => (
          <Movie
            key={index}
            title={movie.title}
            poster={movie.poster ? movie.poster : 'images/noposter.jpg'}
          />
        ))}
        <button type="button">Add</button>
      </div>
    );
  }
}
