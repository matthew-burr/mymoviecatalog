// Add.js adds a new Movie to the Catalog
import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
`;
const Overlay = styled.div`
  z-order: 1000;
  position: fixed;
  top: 25%;
  left: 25%;
  background-color: white;
  width: 50%;
  height: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
`;

export default class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.state = { title: '' };
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleAddMovie(event) {
    event.preventDefault();
    let movie = { title: this.state.title, poster: 'images/noposter.jpg' };
    this.props.handleAddMovie(movie);
  }

  render() {
    return (
      <Overlay>
        <h1>Add a New Movie</h1>
        <form onSubmit={this.handleAddMovie}>
          <Label htmlFor="movieTitle">Title</Label>
          <input
            id="movieTitle"
            type="text"
            placeholder="Movie Title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <button type="submit">Add</button>
        </form>
      </Overlay>
    );
  }
}
