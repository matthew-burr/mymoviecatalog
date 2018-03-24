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
} from './components';
const BAD_IMAGE_SERVER = 'ia.media-imdb.com';
const GOOD_IMAGE_SERVER = 'images-na.ssl-images-amazon.com';

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

export default class AddMovie extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleResultClick = this.handleResultClick.bind(this);
    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.state = {
      title: '',
      release_year: '',
      rating: '',
      poster: '',
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
              poster: item.Poster.replace(BAD_IMAGE_SERVER, GOOD_IMAGE_SERVER),
            })),
          });
        } else console.log(result);
      })
      .catch(err => console.log(err));
  }

  handleResultClick(movie) {
    this.setState({
      title: movie.title,
      release_year: movie.release_year,
      poster: movie.poster,
    });
  }

  handleAddMovie(event) {
    event.preventDefault();
    if (this.state.title.trim === '') return;
    let movie = {
      title: this.state.title,
      release_year: this.state.release_year,
      poster: this.state.poster || 'images/noposter.jpg',
    };
    this.props.handleAddMovie(movie);
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
                <Button type="button" onClick={this.handleSearch}>
                  Search
                </Button>
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
                <Button type="submit">Add</Button>
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
