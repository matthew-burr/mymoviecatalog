import React from 'react';
import styled from 'styled-components';
import { Button, Input } from '../components';

export default class Search extends React.Component {
  render() {
    return (
      <form>
        <Input inputWidth="60%" type="text" placeholder="Enter a search term" />
        <Button type="button" value="Search" />
      </form>
    );
  }
}
