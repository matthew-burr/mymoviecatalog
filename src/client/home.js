import React from 'react';
import Header from './header/header';
import SideBar from './sidebar/sidebar';
import MovieCatalog from './catalog/moviecatalog';
import { Route } from 'react-router-dom';
import { Layout } from './components';
import { connect } from 'react-redux';

export default class Home extends React.Component {
  render() {
    let { data } = this.props;
    return (
      <Layout vertical>
        <Header />
        <MovieCatalog />
      </Layout>
    );
  }
}
