// movie.jsx Presents an individual movie
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// copies example from https://www.w3schools.com/css/css3_shadows.asp
const Poster = styled.img`
  width: 100%;
  border-bottom: 1px solid rgb(200, 200, 200);
`;

const PosterCaption = styled.div`
  text-align: center;
  padding: 10px;
`;

const MoviePanel = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 200px;
  margin: 10px;
  display: inline-block;
`;

export const Movie = ({ title, poster }) => (
  <MoviePanel>
    <Poster src={poster} />
    <PosterCaption>{title}</PosterCaption>
  </MoviePanel>
);

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};
