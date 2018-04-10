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
} from '../components';
import { connect } from 'react-redux';
import { postNewMovie } from '../store/actions';

const BAD_IMAGE_SERVER = 'ia.media-imdb.com';
const GOOD_IMAGE_SERVER = 'images-na.ssl-images-amazon.com';
const API_BASE = 'https://www.omdbapi.com/?apikey=4ba5e3af';

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

const ConstrainedLayout = styled(Layout)`
  min-width: 50%;
  padding-left: 5px;
`;

const SearchResultItem = ({ movie, onClick }) => (
  <MiniMoviePanel onClick={() => onClick(movie)}>
    <MiniMoviePoster src={movie.poster} />
    <p>
      {movie.title} ({movie.release_year})
    </p>
  </MiniMoviePanel>
);

const mapDispatchToProps = dispatch => {
  return {
    onAdd: movie => {
      dispatch(postNewMovie(movie));
    },
  };
};
const SearchResult = ({ movies, onResultClick }) => {
  if (movies && movies.length) {
    return (
      <Layout scrollable wrapping>
        {movies.map((movie, index) => (
          <SearchResultItem movie={movie} key={index} onClick={onResultClick} />
        ))}
      </Layout>
    );
  }

  return null;
};

class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleResultClick = this.handleResultClick.bind(this);
    this.state = {
      title: '',
      release_year: '',
      rating: '',
      poster: '',
      imdbID: '',
      searchResults: [],
    };
  }

  handleFieldChange(newState) {
    this.setState(newState);
  }

  handleSearch() {
    const term = this.state.title;
    if (!term) return;

    const API_BASE = 'https://www.omdbapi.com/?apikey=4ba5e3af';
    fetch(API_BASE + `&s=${term}`)
      .then(response => response.json())
      .then(result => {
        if (result.Response === 'True' && result.Search.length) {
          console.log('Setting state');
          this.setState({
            searchResults: result.Search.map(item => ({
              title: item.Title,
              release_year: item.Year,
              poster:
                item.Poster === 'N/A'
                  ? 'images/noposter.jpg'
                  : item.Poster.replace(BAD_IMAGE_SERVER, GOOD_IMAGE_SERVER),
              imdbID: item.imdbID,
            })),
          });
        } else console.log(result);
      })
      .catch(err => console.log(err));
  }

  handleResultClick(movie) {
    const imdbID = movie.imdbID;

    // get rating
    fetch(API_BASE + `&i=${imdbID}`)
      .then(response => response.json())
      .then(result => {
        this.setState({ rating: result.Rated });
      });
    this.setState({
      title: movie.title,
      release_year: movie.release_year,
      poster: movie.poster,
      imdbID: movie.imdbID,
    });
  }

  render() {
    return (
      <Overlay height="80%" top="10%" width="80%" left="10%">
        <CloseButton to="/" size="25px" color="gray">
          <span className="fa fa-close" />
        </CloseButton>
        <Layout vertical>
          <h1>Add a New Movie</h1>
          <Layout>
            <ConstrainedLayout vertical>
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
                <Button value="Search" onClick={this.handleSearch} />
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
                <Button
                  onClick={() => {
                    this.props.onAdd({
                      title: this.state.title,
                      release_year: this.state.release_year,
                      rating: this.state.rating,
                      poster: this.state.poster || 'images/noposter.jpg',
                    });
                  }}
                  value="Add"
                />
              </form>
            </ConstrainedLayout>
            <SearchResult
              movies={this.state.searchResults}
              onResultClick={this.handleResultClick}
            />
          </Layout>
        </Layout>
      </Overlay>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddMovie);
