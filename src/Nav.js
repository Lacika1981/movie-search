import React, { Fragment } from 'react';
import { Router, Link } from '@reach/router';
import Home from './Home';
import './Nav.scss';

export default function Nav() {
  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'active' } : null;
  };

  return (
    <Fragment>
      <header className="sticky">
        <nav className="nav">
          <Link getProps={isActive} to="/">
            Home
          </Link>{' '}
        </nav>
      </header>

      <Router>
        <Home path="/" />
      </Router>
    </Fragment>
  );
}
