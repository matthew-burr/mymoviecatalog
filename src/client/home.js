import React from 'react';
import Header from './header';
import SideBar from './sidebar';
import MovieCatalog from './moviecatalog';

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
