import React from 'react';
import { render } from 'react-dom';
import Home from './home';
import CreateUser from './security/createuser';
import Login from './security/login';
import AddMovie from './catalog/addmovie';
import EditMovie from './catalog/editmovie';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { withRouter } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import {
  fetchAllMovies,
  selectMovie,
  setHeaderFunction,
} from './store/actions';
import appReducer from './store/reducers';
import { Provider } from 'react-redux';

const store = createStore(appReducer, applyMiddleware(thunkMiddleware));
setHeaderFunction(() => {
  let { user } = store.getState();
  if (user.token) {
    return new Headers({
      'Content-Type': 'application/json',
      Authentication: `Bearer ${user.token}`,
    });
  }
  return new Headers({
    'Content-Type': 'application/json',
  });
});

// Credit to https://tylermcginnis.com/react-router-protected-routes-authentication/ for PrivateRoute
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().user.token ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/createuser" component={CreateUser} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Home} />} />
        </Switch>
        <Route path="/addmovie" component={AddMovie} />
        <Route path="/editmovie" component={EditMovie} />
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
