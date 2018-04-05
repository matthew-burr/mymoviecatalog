import React from 'react';
import UserInfo from './userinfo';
import Search from './search';
import styled from 'styled-components';
import { ShadowPanel, Layout } from '../components';
import { connect } from 'react-redux';

const HeaderContainer = ShadowPanel.extend`
  display: flex;
  width: 100%;
  background-color: rgb(200, 0, 0);
  padding-left: 40px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: white;
  font-size: 36pt;
  flex-grow: 3;
`;

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const SiteTitle = ({ children }) => <Title>{children}</Title>;

const ControlPanel = ({ user }) => (
  <Layout vertical>
    <UserInfo user={user} />
    <Search />
  </Layout>
);

class Header extends React.Component {
  render() {
    let { user } = this.props;
    return (
      <HeaderContainer>
        <Layout>
          <SiteTitle>My Movie Catalog</SiteTitle>
          <ControlPanel user={user} />
        </Layout>
      </HeaderContainer>
    );
  }
}

export default connect(mapStateToProps)(Header);
