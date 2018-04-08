import React, { Component } from 'react';
import { Title, Layout, ButtonLink, Overlay } from './components';
import styled from 'styled-components';

const CenterTitle = styled(Title)`
  text-align: center;
  flex-grow: 0;
`;

const P = styled.p`
  text-align: center;
  width: 60%;
  color: white;
`;

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <Layout width="100vw" height="100vh" centered="both" vertical>
          <CenterTitle>My Movie Catalog</CenterTitle>
          <P>Welcome to My Movie Catalog</P>
          <P>
            For movie lovers - like you - who have a large collection of DVDs
            and Blu-Rays, My Movie Catalog is your tool to index your entire
            collection, making it easy to find out if you own a movie and pick
            just the right movie for an evening in with friends and family.
          </P>
          <P>
            If you already have an account,{' '}
            <ButtonLink to="/login" margin="0">
              Log In
            </ButtonLink>. If not, then you should{' '}
            <ButtonLink to="/createuser" margin="0">
              Create an Account
            </ButtonLink>{' '}
            now.
          </P>
        </Layout>
      </div>
    );
  }
}
