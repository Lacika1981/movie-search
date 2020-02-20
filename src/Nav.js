import React from 'react';
import { Link } from '@reach/router';

const Nav = () => {
  return (
    <Link className="nav home-link" to={`${process.env.PUBLIC_URL}/`}>
      OMDB Movie Search
    </Link>
  );
};

export default Nav;
