import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  color: white;
`;

export default class Genre extends React.Component {
  render() {
    let { name } = this.props;
    return (
      <ListItem>
        <input type="checkbox" value={name} />
        {name}
      </ListItem>
    );
  }
}
