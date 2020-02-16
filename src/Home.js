import React, { Fragment, useState, useEffect } from 'react';
import { Link, Router } from '@reach/router';
import Search from './Search';
import './App.scss';

function Home() {
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(`http://www.omdbapi.com/?s=alien&apikey=7f555475`)
        .then(response => response.json())
        .then(json => setMovie(json));
    }
    fetchData();
  }, []);

  return movies.Response === 'True' ? (
    <Fragment>
      <Router>
        <Search path="/search" />
      </Router>
      <h1 className="omdb-title">
        OMDB Movie Search
        <span className="block">
          <nav>
            <Link to="search">Enter</Link>
          </nav>
        </span>
      </h1>

      <div className="grid landing-container">
        {movies.Search.map(movie => {
          return (
            <img src={movie.Poster} alt={movie.Title} key={movie.imdbID} />
          );
        })}
      </div>
    </Fragment>
  ) : null;
}

export default Home;
