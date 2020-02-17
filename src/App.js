import React, { Fragment } from 'react';
import Home from './Home';
import { Router } from '@reach/router';
import Details from './Details';

function App() {
  return (
    <Fragment>
      <Router path={`${process.env.PUBLIC_URL}/public/apps/movie-search`}>
        <Home path={`${process.env.PUBLIC_URL}/`}></Home>
        <Details path={`${process.env.PUBLIC_URL}/detail/:id`} />
      </Router>
    </Fragment>
  );
}

export default App;
