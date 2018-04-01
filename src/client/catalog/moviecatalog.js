import React from 'react';
import { Movie } from './movie';
import { Link, Route } from 'react-router-dom';
import { StyledLink, Layout, STANDARD_BOX_SHADOW } from '../components';
import { connect } from 'react-redux';
import AddMovie from './addmovie';

const AddButton = StyledLink.extend`
  z-index: 500;
  position: fixed;
  bottom: 50px;
  right: 50px;
  background-color: rgb(200, 0, 0);
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  box-shadow: ${STANDARD_BOX_SHADOW};
  line-height: 50px;
`;

const mapStateToProps = state => ({ movies: state.movieCatalog.movies });

class BaseMovieCatalog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { movies } = this.props;
    return (
      <div>
        <Layout wrapping>
          {movies.map((movie, index) => <Movie key={index} movie={movie} />)}
          <AddButton to="/addmovie" size="50px" color="white">
            +
          </AddButton>
        </Layout>
      </div>
    );
  }
}

const MovieCatalog = connect(mapStateToProps)(BaseMovieCatalog);

export default MovieCatalog;
