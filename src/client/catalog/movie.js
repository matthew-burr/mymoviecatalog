// movie.jsx Presents an individual movie
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ShadowPanel, Layout, STANDARD_BOX_SHADOW } from '../components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectMovie } from '../store/actions';

// copies example from https://www.w3schools.com/css/css3_shadows.asp
const Poster = styled.img`
  width: 100%;
  box-shadow: ${STANDARD_BOX_SHADOW};
`;

const PosterCaption = styled.div`
  text-align: center;
  min-height: 2.5em;
  color: white;
  flex-grow: 1;
  align-items: flex-end;
  display: flex;
  justify-content: center;
`;

const MoviePanel = styled.div`
  width: 200px;
  height: 355px;
  margin: 20px 10px 20px 10px;
  display: inline-flex;
`;

const UngarnishedLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const mapDispatchToProps = dispatch => {
  return {
    onSelect: movie => {
      dispatch(selectMovie(movie));
    },
  };
};

const Movie = ({ movie, onSelect }) => (
  <UngarnishedLink
    to="/editmovie"
    onClick={() => {
      onSelect(movie);
    }}
  >
    <MoviePanel>
      <Layout vertical>
        <Poster src={movie.poster || 'images/noposter.jpg'} />
        <PosterCaption>
          <span>{movie.title}</span>
        </PosterCaption>
      </Layout>
    </MoviePanel>
  </UngarnishedLink>
);

export default connect(null, mapDispatchToProps)(Movie);
