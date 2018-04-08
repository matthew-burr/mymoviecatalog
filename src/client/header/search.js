import React from 'react';
import styled from 'styled-components';
import { Button, Input, ButtonLink } from '../components';
import { connect } from 'react-redux';
import { searchFor } from '../store/actions';

const connectState = ({ search }) => ({ search_term: search.search_term });
const dispatches = dispatch => {
  return {
    onSearch: search_term => {
      console.log(`Searching for: ${search_term}`);
      dispatch(searchFor(search_term));
    },
  };
};
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search_term: this.props.search_term || '' };
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(newState) {
    this.setState(newState);
  }

  render() {
    return (
      <form>
        <Input
          inputWidth="60%"
          type="text"
          placeholder="Enter a search term"
          onChange={e =>
            this.handleFieldChange({ search_term: e.target.value })
          }
        />
        <ButtonLink
          to="/"
          onClick={() => this.props.onSearch(this.state.search_term)}
          margin="10px 0 10px 10px"
        >
          Search
        </ButtonLink>
      </form>
    );
  }
}

export default connect(connectState, dispatches)(Search);
