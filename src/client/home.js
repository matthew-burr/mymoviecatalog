import React from 'react';
import Header from './header/header';
import SideBar from './sidebar/sidebar';
import MovieCatalog from './catalog/moviecatalog';
import { Route } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <div>
        <div className="row">
          <Header user={data.user} />
        </div>
        <div className="row">
          <div className="col-sm-2">
            <SideBar genres={data.genres} />
          </div>
          <div className="col-sm-10">
            <MovieCatalog />
          </div>
        </div>
      </div>
    );
  }
}
