import React, { Fragment, useEffect, useState } from 'react';

const Search = props => {
  const [searchValue, setSearch] = useState('friends');
  const [movies, setMovies] = useState([]);
  const [inputValue, setInput] = useState('');

  useEffect(() => {
    async function fetchData() {
      await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=7f555475`)
        .then(response => response.json())
        .then(json => setMovies(json));
    }
    fetchData();
  }, [searchValue]);

  props.setThem(movies);

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
          className="search-button"
          type="submit"
          value="Search it"
          onClick={e => {
            e.preventDefault();
            setSearch(inputValue);
          }}
        ></input>
      </form>
    </Fragment>
  );
};

export default Search;
