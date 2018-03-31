import React from 'react';

export default class UserInfo extends React.Component {
  render() {
    let { user } = this.props;
    return <p>Hello, {user.first_name}!!</p>;
  }
}
