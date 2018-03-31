import React from 'react';
import { render } from 'react-dom';
import Home from './home';
import AddMovie from './addmovie';
import EditMovie from './editmovie';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { fetchAllMovies } from './actions';
import appReducer from './reducers';
import { Provider } from 'react-redux';

const DATA_MODEL = {
  user: {
    id: 1,
    email: 'matt.d.burr@gmail.com',
    first_name: 'Matthew',
    last_name: 'Burr',
  },
  genres: [{ genre: 'Action' }, { genre: 'Comedy' }, { genre: 'Drama' }],
};
const AddMovieWithHistory = withRouter(AddMovie);
const store = createStore(appReducer, applyMiddleware(thunkMiddleware));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.handleEditMovie = this.handleEditMovie.bind(this);
    this.handleDeleteMovie = this.handleDeleteMovie.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    /*fetch('/movies')
      .then(results => {
        return results.json();
      })
      .then(movies => {
        this.setState({ movies: movies });
      })
      .catch(err => console.log(err));*/
    store.dispatch(fetchAllMovies());
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
        this.props.history.push('/addMovie');
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

  handleDeleteMovie(movie) {
    fetch(`/movies/${movie.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'content-type': 'application/json',
      }),
    }).then(response => {
      if (response.ok) {
        let movies = this.state.movies;
        let movieIndex = movies.findIndex(item => item.id === movie.id);
        movies.splice(movieIndex, 1);
        this.setState({ movies: movies });
        this.props.history.push('/');
      }
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
              onDeleteMovie={this.handleDeleteMovie}
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
  <Provider store={store}>
    <Router>
      <RoutedApp />
    </Router>
  </Provider>,
  document.getElementById('app')
);
