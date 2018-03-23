// Add.js adds a new Movie to the Catalog
import React from 'react';
import styled from 'styled-components';
import { LabeledInput, Overlay, Label } from './components';

export default class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.state = { title: '', release_year: '', rating: '', poster: '' };
  }

  handleFieldChange(newState) {
    this.setState(newState);
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
          <LabeledInput
            id="movieTitle"
            label="Title"
            type="text"
            placeholder="Movie Title"
            value={this.state.title}
            onChange={event =>
              this.handleFieldChange({ title: event.target.value })
            }
          />
          <LabeledInput
            id="releaseYear"
            label="Year"
            type="number"
            placeholder="2018"
            value={this.state.release_year}
            onChange={event =>
              this.handleFieldChange({ release_year: event.target.value })
            }
          />
          <LabeledInput
            id="rating"
            label="Rating"
            type="text"
            placeholder="PG, PG-13, etc."
            value={this.state.rating}
            onChange={event =>
              this.handleFieldChange({ rating: event.target.value })
            }
          />
          <button type="submit">Add</button>
          <button type="button" onClick={this.props.onCancel}>
            Cancel
          </button>
        </form>
      </Overlay>
    );
  }
}
