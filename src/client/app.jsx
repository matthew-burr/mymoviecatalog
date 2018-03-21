import React from 'react';
import { render } from 'react-dom';
import { Provider, createStore } from 'react-redux';

const App = render(<Provider />, document.getElementById('app'));
