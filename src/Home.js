import React, { Fragment, useEffect, useState } from 'react';
import { Link } from '@reach/router';

const Home = () => {
  const [searchValue, setSearch] = useState('alien');
  const [movies, setMovies] = useState([]);
  const [inputValue, setInput] = useState('');
  //   const [selected, setSelected] = useState();

  useEffect(() => {
    async function fetchData() {
      await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=7f555475`)
        .then(response => response.json())
        .then(json => setMovies(json));
    }
    fetchData();
  }, [searchValue]);

  return (
    <Fragment>
      <Link className="nav" to={`${process.env.PUBLIC_URL}/`}>
        OMDB Movie Search
      </Link>
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
          className="search-button"
          type="submit"
          value="Search it"
          onClick={e => {
            e.preventDefault();
            setSearch(inputValue);
          }}
        ></input>
      </form>
      <div className="search-result">
        {movies.Response === 'True'
          ? movies.Search.map(movie => {
              return (
                <Link
                  to={`${process.env.PUBLIC_URL}/detail/${movie.imdbID}`}
                  key={movie.imdbID}
                >
                  <section className="poster">
                    <p className="text-center title bold">{movie.Title}</p>
                    <img src={movie.Poster} alt={movie.Title} />
                  </section>
                </Link>
              );
            })
          : null}
      </div>
    </Fragment>
  );
};

export default Home;
