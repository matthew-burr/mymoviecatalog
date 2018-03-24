// movie.jsx Presents an individual movie
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ShadowPanel, Layout } from './components';
import { Link } from 'react-router-dom';

// copies example from https://www.w3schools.com/css/css3_shadows.asp
const Poster = styled.img`
  width: 100%;
  border-bottom: 1px solid rgb(200, 200, 200);
`;

const PosterCaption = styled.div`
  text-align: center;
  min-height: 2.5em;
`;

const MoviePanel = ShadowPanel.extend`
  width: 200px;
  margin: 10px;
  display: inline-block;
  background-color: white;
`;

const UngarnishedLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const Movie = ({ movie }) => (
  <MoviePanel>
    <UngarnishedLink
      to={{
        pathname: '/editmovie',
        state: { movie: movie },
      }}
    >
      <Layout vertical>
        <Poster src={movie.poster || 'images/noposter.jpg'} />
        <PosterCaption>{movie.title}</PosterCaption>
      </Layout>
    </UngarnishedLink>
  </MoviePanel>
);
