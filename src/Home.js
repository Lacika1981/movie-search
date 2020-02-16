import React, { Fragment, useEffect, useState } from 'react';
import { Link, Router } from '@reach/router';
import Details from './Details';

const Home = () => {
  const [searchValue, setSearch] = useState('alien');
  const [movies, setMovies] = useState([]);
  const [inputValue, setInput] = useState('');
  const [selected, setSelected] = useState('');

  useEffect(() => {
    async function fetchData() {
      await fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=7f555475`)
        .then(response => response.json())
        .then(json => setMovies(json));
    }
    fetchData();
  }, [searchValue]);

  return (
    <Fragment>
      <form>
        <label htmlFor="search-input">Search for Movie</label>
        <input
          id="search-input"
          type="text"
          name="search-field"
          onChange={e => {
            e.preventDefault();
            setInput(e.target.value);
          }}
        ></input>
        <input
          type="submit"
          value="Search it"
          onClick={e => {
            e.preventDefault();
            setSearch(inputValue);
          }}
        ></input>
      </form>
      <div>
        {movies.Response === 'True'
          ? movies.Search.map(movie => {
              return (
                <Link to={`/detail/${movie.Title}`} key={movie.imdbID}>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    onClick={() => setSelected(movie)}
                  />
                </Link>
              );
            })
          : null}
      </div>
      <Router>
        <Details selected={selected} path={`detail/:${selected.Title}`} />
      </Router>
    </Fragment>
  );
};

export default Home;
