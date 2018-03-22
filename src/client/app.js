import React from 'react';
import { render } from 'react-dom';
import Home from './home';

let DATA_MODEL = {
  user: { id: 1, first_name: 'Matthew', last_name: 'Burr' },
  movies: [
    { id: 1, title: 'The Avengers', poster: 'images/noposter.jpg' },
    { id: 2, title: 'Captain America', poster: 'images/noposter.jpg' },
    { id: 3, title: 'Thor', poster: 'images/noposter.jpg' },
  ],
  genres: [{ genre: 'Action' }, { genre: 'Comedy' }, { genre: 'Drama' }],
};

const App = render(<Home data={DATA_MODEL} />, document.getElementById('app'));
