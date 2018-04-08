import React from 'react';
import Movie from './movie';
import { Link, Route } from 'react-router-dom';
import { StyledLink, Layout, STANDARD_BOX_SHADOW } from '../components';
import { connect } from 'react-redux';
import { fetchAllMovies, searchFor } from '../store/actions';
import AddMovie from './addmovie';
import styled from 'styled-components';

const FixedPanel = styled(Layout)`
  z-index: 250;
  position: fixed;
  bottom: 50px;
  right: 50px;
  padding: 10px;
`;

const CircleButton = StyledLink.extend`
  background-color: rgb(200, 0, 0);
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  box-shadow: ${STANDARD_BOX_SHADOW};
  line-height: 50px;
  margin-left: 20px;
`;

const PaddedLayout = Layout.extend`
  padding-left: 40px;
`;

const mapStateToProps = state => ({
  movies: state.movieCatalog.movies,
  search_term: state.search.search_term,
  modal_set: state.modal.modal_set,
});

const mapDispatchToProps = dispatch => ({
  onMounted: () => {
    dispatch(fetchAllMovies());
  },
  onClearSearch: () => {
    dispatch(searchFor(''));
  },
});

class MovieCatalog extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onMounted();
  }

  render() {
    let { movies, search_term, modal_set } = this.props;
    const re = new RegExp(search_term, 'i');
    return (
      <div>
        <PaddedLayout wrapping>
          {movies
            .filter(movie => movie && re.test(movie.title))
            .map((movie, index) => <Movie key={index} movie={movie} />)}
          <FixedPanel>
            {search_term &&
              search_term !== '' && (
                <CircleButton
                  to="/"
                  size="50px"
                  color="white"
                  onClick={() => this.props.onClearSearch()}
                >
                  x
                </CircleButton>
              )}
            <CircleButton to="/addmovie" size="50px" color="white">
              +
            </CircleButton>
          </FixedPanel>
        </PaddedLayout>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCatalog);
