import React, { Fragment, useState, useEffect } from 'react';
import { Router, Link } from '@reach/router';
import Movie from './Movie';

function Search() {
  const [searchValue, setSearchField] = useState('');
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    const grabMovies = () => {
      async function fetchData() {
        await fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=7f555475`)
          .then(response => response.json())
          .then(json => setMovie(json));
      }
      fetchData();
    };
    grabMovies();
  });

  return movies;
}

export default Search;
