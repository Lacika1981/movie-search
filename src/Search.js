import React, { Fragment, useEffect, useState } from 'react';

const Search = props => {
  const [inputValue, setInput] = useState('');
  const [selectValue, setSelect] = useState('');
  const [searchValue, setSearch] = useState('');

  const { setThem } = props;

  useEffect(() => {
    async function fetchData() {
      await fetch(
        `https://www.omdbapi.com/?s=${searchValue}&type=${selectValue}&apikey=7f555475`
      )
        .then(response => response.json())
        .then(json => setThem(json));
    }
    fetchData();
  }, [searchValue, setThem, selectValue]);

  const handleSearchInput = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleTypeSelection = e => {
    e.preventDefault();
    setSelect(e.target.value);
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearch(inputValue);
  };

  const style = {
    marginTop: '15px'
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
        {inputValue ? (
          <Fragment>
            <label style={style} htmlFor='type'>
              Select type(Default Movie)
            </label>
            <select id='type' onChange={handleTypeSelection}>
              <option value='movie'>Movie</option>
              <option value='series'>Series</option>
              <option value='episode'>Episode</option>
            </select>
          </Fragment>
        ) : null}
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
