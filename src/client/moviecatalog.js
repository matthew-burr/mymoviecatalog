import React from 'react';
import { Movie } from './movie';
import { Link } from 'react-router-dom';
import { WrappingLayout, StyledLink } from './components';

const AddButton = StyledLink.extend`
  z-index: 500;
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

export default class MovieCatalog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { movies } = this.props;
    return (
      <WrappingLayout>
        {movies.map((movie, index) => (
          <Movie
            key={index}
            title={movie.title}
            poster={movie.poster ? movie.poster : 'images/noposter.jpg'}
          />
        ))}
        <AddButton to="/addmovie" size="60px" color="rgb(200, 0, 0)">
          <span className="fa fa-plus-circle" />
        </AddButton>
      </WrappingLayout>
    );
  }
}
