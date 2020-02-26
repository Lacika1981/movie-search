import React, { Fragment, useEffect, useState } from 'react';
import './Search.scss';

const Search = props => {
  const [inputValue, setInput] = useState('');
  const [selectValue, setSelect] = useState('movie');
  const [searchValue, setSearch] = useState('');
  const [currentPage, setPage] = useState(1);
  const [maxPages, setPages] = useState();
  const [pageArray, setPageArray] = useState([]);

  const { setThem } = props;

  useEffect(() => {
    async function fetchData() {
      await fetch(
        `https://www.omdbapi.com/?s=${searchValue}&type=${selectValue}&page=${currentPage}&apikey=7f555475`
      )
        .then(response => response.json())
        .then(json => {
          setThem(json);
          setPages(json.totalResults);
        });
    }
    fetchData();
  }, [searchValue, setThem, selectValue, currentPage]);

  useEffect(() => {
    const pageNumbersArray = [];
    const maxPagesNumber = Math.ceil(maxPages / 10);
    for (let i = 1; i <= maxPagesNumber; i++) {
      pageNumbersArray.push(i);
    }
    setPageArray(pageNumbersArray);
  }, [maxPages]);

  const handleSearchInput = e => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleTypeSelection = e => {
    e.preventDefault();
    setSelect(e.target.value);
    setPage('1');
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearch(inputValue);
    setPage('1');
  };

  const handlePageSelection = e => {
    e.preventDefault();
    setPage(e.target.value);
  };

  const style = {
    label: {
      marginTop: '15px'
    },
    paginationContainer: {
      display: 'flex'
    }
  };

  return (
    <Fragment>
      <form autoComplete='off'>
        <label htmlFor='search-input'>Search for Movie</label>
        <input
          id='search-input'
          type='text'
          name='search-field'
          onChange={handleSearchInput}
        ></input>
        {inputValue.length >= 3 ? (
          <Fragment>
            {console.log(currentPage)}
            <label style={style.label} htmlFor='type'>
              Select type(Default Movie)
            </label>
            <select
              id='type'
              onChange={handleTypeSelection}
              value={selectValue}
            >
              <option value='movie'>Movie</option>
              <option value='series'>Series</option>
              <option value='episode'>Episode</option>
            </select>
            {pageArray.length ? (
              <select
                id='page-number'
                style={style.paginationContainer}
                onChange={handlePageSelection}
                value={currentPage}
              >
                {pageArray.map(number => (
                  <option value={number} key={number}>
                    {number}
                  </option>
                ))}
              </select>
            ) : null}
          </Fragment>
        ) : null}
        {inputValue.length >= 3 ? (
          <input
            className='search-button'
            type='submit'
            value='Search it'
            onClick={handleSearch}
          ></input>
        ) : (
          <input
            className='search-button'
            disabled
            type='submit'
            value='Search it'
          ></input>
        )}
      </form>
    </Fragment>
  );
};

export default Search;
