import React, { Fragment, useState, useEffect } from 'react';
import { Link, Router } from '@reach/router';
import Movie from './Movie';
import './App.scss';

function Home() {
  const [searchValue, setSearchField] = useState('alien');
  const [movies, setMovie] = useState([]);
  const [movie, setMovieTitle] = useState(searchValue);
  const [clickedMovie, setClickedMovie] = useState('');

  useEffect(() => {
    async function fetchData() {
      await fetch(`http://www.omdbapi.com/?s=${movie}&apikey=7f555475`)
        .then(response => response.json())
        .then(json => setMovie(json));
    }
    fetchData();
  }, [movie]);

  return movies.Response === 'True' ? (
    <Fragment>
      <h1 className="omdb-title">
        OMDB Movie Search
        <form>
          <label htmlFor="search-field">
            <input
              id="search-field"
              type="text"
              value={searchValue}
              onChange={e => setSearchField(e.target.value)}
            />
          </label>
          <input
            type="submit"
            value="Submit"
            onClick={e => {
              e.preventDefault();
              setMovieTitle(searchValue);
            }}
          />
        </form>
      </h1>

      <div className="grid landing-container">
        {movies.Search.map(movieElem => {
          return (
            <Fragment key={movieElem.imdbID}>
              <Link to={`/movie/${movieElem.Title}`}>
                <img
                  src={movieElem.Poster}
                  alt={movieElem.Title}
                  onClick={e => setClickedMovie(movieElem.imdbID)}
                />
              </Link>
            </Fragment>
          );
        })}
        <Router>
          <Movie path={`/movie/${clickedMovie.Title}`} />
        </Router>
      </div>
    </Fragment>
  ) : null;
}

export default Home;
