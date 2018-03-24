// movie.jsx Presents an individual movie
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ShadowPanel, VerticalLayout } from './components';

// copies example from https://www.w3schools.com/css/css3_shadows.asp
const Poster = styled.img`
  width: 100%;
  border-bottom: 1px solid rgb(200, 200, 200);
`;

const PosterCaption = styled.p`
  text-align: center;
`;

const MoviePanel = ShadowPanel.extend`
  width: 200px;
  margin: 10px;
  display: inline-block;
`;

export const Movie = ({ title, poster }) => (
  <MoviePanel hasShadow>
    <VerticalLayout>
      <Poster src={poster} />
      <PosterCaption>{title}</PosterCaption>
    </VerticalLayout>
  </MoviePanel>
);

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};
