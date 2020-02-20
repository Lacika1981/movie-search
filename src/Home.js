import React, { Fragment, useState, useEffect } from 'react';
import { Link } from '@reach/router';
import Search from './Search';
import Nav from './Nav';

const Home = () => {
  const [movies, setThem] = useState([]);

  return (
    <Fragment>
      <Nav />
      <Search setThem={setThem} />
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
