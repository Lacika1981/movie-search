import React, { Fragment } from 'react';
import Home from './Home';
import { Router } from '@reach/router';
import Details from './Details';

function App() {
  return (
    <Fragment>
      <Router>
        <Home path="/"></Home>
        <Details path="/detail/:id" />
      </Router>
    </Fragment>
  );
}

export default App;
