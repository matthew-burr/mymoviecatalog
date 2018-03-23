import React from 'react';
import UserInfo from './userinfo';
import Search from './search';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: rgb(200, 0, 0);
  padding-left: 20px;
`;

const Title = styled.h1`
  color: white;
  font-size: 36pt;
  font-family: Arial, sans-serif;
`;

const SiteTitle = ({ children }) => (
  <div className="col-sm-10">
    <Title>{children}</Title>
  </div>
);

const ControlPanel = ({ user }) => (
  <div className="col-sm-2">
    <div className="row">
      <UserInfo user={user} />
    </div>
    <div className="row">
      <Search />
    </div>
  </div>
);

export default class Header extends React.Component {
  render() {
    let { user } = this.props;
    return (
      <HeaderContainer>
        <SiteTitle>My Movie Catalog</SiteTitle>
        <ControlPanel user={user} />
      </HeaderContainer>
    );
  }
}
