import React from 'react';
import Genre from './genre';
import styled from 'styled-components';

const SideBarTitle = styled.h1`
  text-align: center;
`;

const UnmarkedList = styled.ul`
  list-style-type: none;
`;

export default class GenreFilter extends React.Component {
  render() {
    let { genres } = this.props;
    return (
      <div>
        <SideBarTitle>Genre</SideBarTitle>
        <UnmarkedList>
          {genres.map((item, index) => <Genre name={item.genre} key={index} />)}
        </UnmarkedList>
      </div>
    );
  }
}
