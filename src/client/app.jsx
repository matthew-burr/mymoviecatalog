import React from 'react';
import { render } from 'react-dom';
import { Provider, createStore } from 'react-redux';
import Routing from './routing.jsx';
import Home from './home.jsx';

const App = render(<Home />, document.getElementById('app'));
