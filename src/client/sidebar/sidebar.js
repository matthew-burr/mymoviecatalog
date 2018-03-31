import React from 'react';
import GenreFilter from './genrefilter';

export default class SideBar extends React.Component {
  render() {
    let { genres } = this.props;
    return <GenreFilter genres={genres} />;
  }
}
