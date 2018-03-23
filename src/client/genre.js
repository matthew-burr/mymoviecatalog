import React from 'react';

export default class Genre extends React.Component {
  render() {
    let { name } = this.props;
    return (
      <li>
        <input type="checkbox" value={name} />
        {name}
      </li>
    );
  }
}
