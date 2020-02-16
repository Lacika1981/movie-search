import React, { Fragment, useEffect, useState } from 'react';
import { Link, Router } from '@reach/router';
import Details from './Details';

const Home = () => {
  const [searchValue, setSearch] = useState('alien');
  const [movies, setMovies] = useState([]);
  const [inputValue, setInput] = useState('');
  //   const [selected, setSelected] = useState();

  useEffect(() => {
    async function fetchData() {
      await fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=7f555475`)
        .then(response => response.json())
        .then(json => setMovies(json));
    }
    fetchData();
  }, [searchValue]);

  //   const searchMovie = id => {
  //     movies.Search.find(movie => {
  //       setSelected(movie);
  //       return movie.imdbID === id;
  //     });
  //   };

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
                <Link to={`/detail/${movie.imdbID}`} key={movie.imdbID}>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    // onClick={() => searchMovie(movie.imdbID)}
                  />
                </Link>
              );
            })
          : null}
      </div>
    </Fragment>
  );
};

export default Home;
