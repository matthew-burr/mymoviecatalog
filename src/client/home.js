import React from 'react';
import Header from './header';
import SideBar from './sidebar';
import MovieCatalog from './moviecatalog';

export default class Home extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <div>
        <Header user={data.user} />
        <SideBar genres={data.genres} />
        <MovieCatalog movies={data.movies} />
      </div>
    );
  }
}
