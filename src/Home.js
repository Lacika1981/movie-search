import React, { Fragment, useState } from 'react';
import { Link } from '@reach/router';
import Search from './Search';
import Nav from './Nav';
import './Home.scss';

const Home = () => {
  const [movies, setThem] = useState([]);

  const style = {
    h1: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  };

  const imageMissingHandler = e => {
    return (
      (e.target.src = `${process.env.PUBLIC_URL}/no-photo.png`),
      e.target.classList.add('missing-image')
    );
  };

  return (
    <Fragment>
      <Nav />
      <Search setThem={setThem} />
      <div className='search-result'>
        {movies.Response === 'True' ? (
          movies.Search.map(movie => {
            return (
              <Link
                to={`${process.env.PUBLIC_URL}/detail/${movie.imdbID}`}
                key={movie.imdbID}
              >
                <section className='poster'>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    onError={e => imageMissingHandler(e)}
                  />
                  <div className='overlay'>
                    <p className='text-center title bold'>{movie.Title}</p>
                  </div>
                </section>
              </Link>
            );
          })
        ) : movies.Error === 'Movie not found!' ? (
          <h1 style={style.h1}>
            Episode(s) not found. Change type or search for something else
          </h1>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Home;
