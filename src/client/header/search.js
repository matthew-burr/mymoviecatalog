import React from 'react';
import styled from 'styled-components';

export default class Search extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Enter a search term" />
        <button type="button">Search</button>
      </form>
    );
  }
}
