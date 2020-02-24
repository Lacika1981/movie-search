import React, { Fragment, useEffect, useState } from 'react';

const Search = props => {
  const [inputValue, setInput] = useState('');
  const [selectValue, setSelect] = useState('');
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
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearch(inputValue);
  };

  const style = {
    label: {
      marginTop: '15px'
    },
    paginationContainer: {
      display: 'flex'
    },
    pagination: {
      listStyle: 'none'
    }
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
            <label style={style.label} htmlFor='type'>
              Select type(Default Movie)
            </label>
            <select id='type' onChange={handleTypeSelection}>
              <option value='movie'>Movie</option>
              <option value='series'>Series</option>
              <option value='episode'>Episode</option>
            </select>
            <nav style={style.paginationContainer}>
              {!pageArray.length
                ? 'no results'
                : pageArray.map(number => {
                    console.log('called');
                    return (
                      <li
                        style={style.pagination}
                        value={number}
                        key={number}
                        onClick={e => setPage(e.target.value)}
                      >
                        {number}
                      </li>
                    );
                  })}
            </nav>
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
