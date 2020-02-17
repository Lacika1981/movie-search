import React, { Fragment, useEffect, useState } from 'react';
import { Link } from '@reach/router';
import './Details.scss';

const Details = props => {
  const [movie, setMovie] = useState('');

  useEffect(() => {
    async function fetchData() {
      await fetch(`https://www.omdbapi.com/?i=${props.id}&apikey=7f555475`)
        .then(response => response.json())
        .then(json => setMovie(json));
    }
    fetchData();
  }, [props.id]);
  return props.id ? (
    <Fragment>
      <Link className="nav" to={`${process.env.PUBLIC_URL}/`}>
        OMDB Movie Search
      </Link>
      <div className="outer-container">
        <div className="left">
          <header className="flex">
            <h1>{movie.Title}</h1>
            <p className="year">{`Released: ${movie.Year}`}</p>
            <p className="director bold">{`Director: ${movie.Director}`}</p>
          </header>
          <section className="actors text-center">
            <p className="actors-title bold">Actors</p>
            <p>{movie.Actors}</p>
          </section>
          <section className="plot text-center">
            <p className="plot-title bold">Plot</p>
            <p className="plot_description">{movie.Plot}</p>
          </section>
        </div>
        <section className="ratings">
          {movie.Ratings
            ? movie.Ratings.map(rate => {
                return (
                  <div className="flex ratings-container" key={rate.Source}>
                    <p className="ratings-source bold">{rate.Source}</p>
                    <p className="ratings-score">{rate.Value}</p>
                  </div>
                );
              })
            : null}
        </section>
        <div className="right">
          <section className="poster">
            <img src={movie.Poster} key={movie.imdbID} alt={movie.Title} />
          </section>
        </div>
      </div>
    </Fragment>
  ) : null;
};

export default Details;
