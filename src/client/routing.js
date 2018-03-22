import React from 'react';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';

export default function Routes() {
  return (
    <Router>
      <Route path="/" component={Home} />
    </Router>
  );
}
