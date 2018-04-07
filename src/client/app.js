import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { withRouter } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import {
  fetchAllMovies,
  selectMovie,
  setHeaderFunction,
  setClearStorageFunction,
} from './store/actions';
import appReducer from './store/reducers';

import Home from './home';
import CreateUser from './security/createuser';
import Login from './security/login';
import AddMovie from './catalog/addmovie';
import EditMovie from './catalog/editmovie';
import Welcome from './welcome';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);
const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
const persistor = persistStore(store);

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
setClearStorageFunction(() => {
  persistor.purge();
});

// Credit to https://tylermcginnis.com/react-router-protected-routes-authentication/ for PrivateRoute
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        store.getState().user.token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/welcome" />
        )
      }
    />
  );
};
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/createuser" component={withRouter(CreateUser)} />
          <Route path="/login" component={withRouter(Login)} />
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
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <RoutedApp />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);
