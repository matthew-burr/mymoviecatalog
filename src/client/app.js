import React from 'react';
import { render } from 'react-dom';
import Home from './home';
import AddMovie from './catalog/addmovie';
import EditMovie from './catalog/editmovie';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { fetchAllMovies, selectMovie } from './store/actions';
import appReducer from './store/reducers';
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
const store = createStore(appReducer, applyMiddleware(thunkMiddleware));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  componentDidMount() {
    store.dispatch(fetchAllMovies());
  }

  render() {
    return (
      <div>
        <Route path="/" render={() => <Home data={DATA_MODEL} />} />
        <Route path="/addmovie" component={AddMovie} />
        <Route
          path="/editmovie"
          render={() => {
            store.dispatch(selectMovie(this.props.location.state.movie));
            return <EditMovie />;
          }}
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
