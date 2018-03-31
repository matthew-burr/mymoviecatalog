import React from 'react';
import { Movie } from './movie';
import { Link, Route } from 'react-router-dom';
import { StyledLink, Layout } from '../components';
import { connect } from 'react-redux';
import AddMovie from './addmovie';

const AddButton = StyledLink.extend`
  z-index: 500;
  position: fixed;
  bottom: 50px;
  right: 50px;
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
          <AddButton to="/addmovie" size="60px" color="rgb(200, 0, 0)">
            <span className="fa fa-plus-circle" />
          </AddButton>
        </Layout>
      </div>
    );
  }
}

const MovieCatalog = connect(mapStateToProps)(BaseMovieCatalog);

export default MovieCatalog;
