import React from 'react';
import { render } from 'react-dom';
import { Provider, createStore } from 'react-redux';
import Routing from './routing';
import Home from './home';

const App = render(<Home />, document.getElementById('app'));
