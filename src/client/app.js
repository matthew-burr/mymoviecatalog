import React from 'react';
import { render } from 'react-dom';
import Home from './home';
import AddMovie from './addmovie';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

let DATA_MODEL = {
  user: { id: 1, first_name: 'Matthew', last_name: 'Burr' },
  movies: [
    { id: 1, title: 'The Avengers', poster: 'images/noposter.jpg' },
    { id: 2, title: 'Captain America', poster: 'images/noposter.jpg' },
    { id: 3, title: 'Thor', poster: 'images/noposter.jpg' },
  ],
  genres: [{ genre: 'Action' }, { genre: 'Comedy' }, { genre: 'Drama' }],
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: DATA_MODEL.movies };
    this.handleAddMovie = this.handleAddMovie.bind(this);
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

  handleAddMovie(movie) {
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
      .then(movie => {
        let newState = Object.assign({}, this.state, {
          movies: [...this.state.movies, ...movie],
        });
        this.setState(newState);
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <div>
        <Route
          path="/"
          render={() => <Home movies={this.state.movies} data={DATA_MODEL} />}
        />
        <Route
          path="/addmovie"
          render={() => <AddMovie handleAddMovie={this.handleAddMovie} />}
        />
      </div>
    );
  }
}

const RoutedApp = withRouter(App);
render(
  <Router>
    <RoutedApp />
  </Router>,
  document.getElementById('app')
);
