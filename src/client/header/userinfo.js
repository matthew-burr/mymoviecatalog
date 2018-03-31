import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ user: state.user });

class BaseUserInfo extends React.Component {
  render() {
    let { user } = this.props;
    return <p>Hello, {user.first_name}!!</p>;
  }
}

const UserInfo = connect(mapStateToProps)(BaseUserInfo);
export default UserInfo;
