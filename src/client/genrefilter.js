import React from 'react';
import Genre from './genre';

export default class GenreFilter extends React.Component {
  render() {
    let { genres } = this.props;
    return (
      <ul>
        {genres.map((item, index) => <Genre name={item.genre} key={index} />)}
      </ul>
    );
  }
}
