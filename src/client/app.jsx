import React from 'react';
import { render } from 'react-dom';
import { Provider, createStore } from 'react-redux';
import Routing from './routing.jsx';

const App = render(<Routing />, document.getElementById('app'));
