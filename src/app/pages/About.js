import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import { Link, withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

class About extends Component {
  static propTypes = {
    route: PropTypes.object,
  };
  static defaultProps = {};

  injectPageMetadata = () => (
    <Helmet>
      <title>About Page</title>
      <meta
        name="description"
        content="Description of the page less than 150 characters"
      />
    </Helmet>
  );

  render = () => (
    <Fragment>
      {this.injectPageMetadata()}
      <h1>About Page</h1>

      <Link to="/">Home</Link>
      <br />
      <Link to="/about/example">Example</Link>
      {renderRoutes(this.props.route.routes)}
    </Fragment>
  );
}

export default hot(module)(withRouter(About));