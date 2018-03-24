// movie.jsx Presents an individual movie
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ShadowPanel, VerticalLayout } from './components';
import { Link } from 'react-router-dom';

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

export const Movie = ({ movie }) => (
  <MoviePanel>
    <Link
      to={{
        pathname: '/editmovie',
        state: { movie: movie },
      }}
    >
      <VerticalLayout>
        <Poster src={movie.poster || 'images/noposter.jpg'} />
        <PosterCaption>{movie.title}</PosterCaption>
      </VerticalLayout>
    </Link>
  </MoviePanel>
);
