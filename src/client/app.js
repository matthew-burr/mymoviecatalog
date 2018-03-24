import React from 'react';
import { render } from 'react-dom';
import Home from './home';
import AddMovie from './addmovie';
import EditMovie from './editmovie';
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

const AddMovieWithHistory = withRouter(AddMovie);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: DATA_MODEL.movies };
    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.handleEditMovie = this.handleEditMovie.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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

  handleEditMovie(movie) {
    fetch(`/movies/${movie.id}`, {
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
        let updatedMovie = data[0];
        let newState = {
          movies: this.state.movies.map(movie => {
            if (movie.id === updatedMovie.id) {
              return updatedMovie;
            }
            return movie;
          }),
        };
        this.setState(newState);
        this.props.history.push('/');
      });
  }

  handleCancel() {
    this.props.history.push('/');
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
          render={() => (
            <AddMovie
              handleAddMovie={this.handleAddMovie}
              onCancel={this.handleCancel}
            />
          )}
        />
        <Route
          path="/editmovie"
          render={() => (
            <EditMovie
              handleEditMovie={this.handleEditMovie}
              movie={this.props.location.state.movie}
            />
          )}
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
