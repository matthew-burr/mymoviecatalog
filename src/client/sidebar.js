import React from 'react';
import GenreFilter from './genrefilter';

export default class SideBar extends React.Component {
  render() {
    let { genres } = this.props;
    return (
      <div>
        <GenreFilter genres={genres} />
      </div>
    );
  }
}
