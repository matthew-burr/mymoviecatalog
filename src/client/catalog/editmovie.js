// Add.js adds a new Movie to the Catalog
import React from 'react';
import styled from 'styled-components';
import {
  LabeledInput,
  Overlay,
  ShadowPanel,
  Label,
  StyledLink,
  Layout,
  Button,
  ButtonLink,
} from '../components';
import { connect } from 'react-redux';
import { putUpdateMovie, sendDeleteMovie } from '../store/actions';
import { Link } from 'react-router-dom';

const MiniMoviePoster = styled.img`
  width: 100%;
`;

const MiniMoviePanel = ShadowPanel.extend`
  width: 200px;
  margin: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const CloseButton = StyledLink.extend`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const mapStateToProps = state => ({ movie: state.currentMovie.movie });
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: movie => {
      dispatch(putUpdateMovie(movie));
    },
    onDelete: movie => {
      dispatch(sendDeleteMovie(movie));
    },
  };
};

class EditMovie extends React.Component {
  constructor(props) {
    super(props);
    let { movie } = this.props;
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.state = {
      id: movie.id || 0,
      title: movie.title || '',
      release_year: movie.release_year || '',
      rating: movie.rating || '',
      poster: movie.poster || '',
    };
  }

  handleFieldChange(newState) {
    this.setState(newState);
  }

  render() {
    return (
      <Overlay height="80%" top="10%" width="80%" left="10%">
        <CloseButton to="/" size="25px" color="gray">
          <span className="fa fa-close" />
        </CloseButton>
        <Layout vertical>
          <h1>Edit Your Movie</h1>
          <Layout>
            <Layout vertical>
              <form>
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
                <LabeledInput
                  id="poster"
                  label="Poster URL"
                  type="text"
                  placeholder="https://poster.jpg"
                  value={this.state.poster}
                  onChange={event =>
                    this.handleFieldChange({ poster: event.target.value })
                  }
                />
                <ButtonLink
                  to="/"
                  onClick={() => {
                    this.props.onSubmit({
                      id: this.state.id,
                      title: this.state.title,
                      release_year: this.state.release_year,
                      rating: this.state.rating,
                      poster: this.state.poster || 'images/noposter.jpg',
                    });
                  }}
                >
                  Save Changes
                </ButtonLink>
                <ButtonLink
                  to="/"
                  onClick={() => {
                    this.props.onDelete({
                      id: this.state.id,
                    });
                  }}
                >
                  Delete Movie
                </ButtonLink>
              </form>
            </Layout>
          </Layout>
        </Layout>
      </Overlay>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMovie);
