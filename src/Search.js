import React, { Fragment, useEffect, useState } from 'react';

const Search = props => {
  const [searchValue, setSearch] = useState('');
  const [inputValue, setInput] = useState('');

  const { setThem } = props;

  useEffect(() => {
    async function fetchData() {
      await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=7f555475`)
        .then(response => response.json())
        .then(json => setThem(json));
    }
    fetchData();
  }, [searchValue, setThem]);

  const handleSearchInput = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearch(inputValue);
  };

  return (
    <Fragment>
      <form>
        <label htmlFor='search-input'>Search for Movie</label>
        <input
          id='search-input'
          type='text'
          name='search-field'
          onChange={handleSearchInput}
        ></input>
        <input
          className='search-button'
          type='submit'
          value='Search it'
          onClick={handleSearch}
        ></input>
      </form>
    </Fragment>
  );
};

export default Search;
