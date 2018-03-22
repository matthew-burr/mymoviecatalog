import React from 'react';
import UserInfo from './userinfo';
import Search from './search';

export default class Header extends React.Component {
  render() {
    let { user } = this.props;
    return (
      <div>
        <UserInfo user={user} />
        <Search />
      </div>
    );
  }
}
