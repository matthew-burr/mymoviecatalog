import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ButtonLink, Layout } from '../components';
import { logOut } from '../store/actions';

const P = styled.p`
  color: white;
`;

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => {
  return {
    onLogout: async () => {
      await dispatch(logOut());
    },
  };
};

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout() {
    await this.props.onLogout();
  }

  render() {
    return (
      <Layout grow="0">
        <P>Hello, {this.props.user.first_name}!!</P>
        <ButtonLink
          to="/welcome"
          onClick={this.handleLogout}
          margin="10px 0 10px 10px"
        >
          Log Out
        </ButtonLink>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
