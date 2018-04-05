import React from 'react';
import GenreFilter from './genrefilter';

const GENRES = [{ genre: 'Action' }, { genre: 'Comedy' }, { genre: 'Drama' }];

export default class SideBar extends React.Component {
  render() {
    return <GenreFilter genres={GENRES} />;
  }
}
