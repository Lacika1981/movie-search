import React, { Fragment, useEffect, useState } from 'react';
import { Link } from '@reach/router';

const Details = props => {
  console.log({ props });

  const [movie, setMovie] = useState('');

  useEffect(() => {
    async function fetchData() {
      await fetch(`http://www.omdbapi.com/?i=${props.id}&apikey=7f555475`)
        .then(response => response.json())
        .then(json => setMovie(json));
    }
    fetchData();
  }, [props.id]);
  console.log(movie);
  return props.id ? (
    <Fragment>
      <Link to="/">OMDB Movie Search</Link>
      <header>
        <h1>{movie.Title}</h1>
        <p className="year">{`Released: ${movie.Year}`}</p>
        <p className="director">{`Director: ${movie.Director}`}</p>
      </header>
      <section className="actors">
        <p className="actors-title">Actors</p>
        <p>{movie.Actors}</p>
      </section>
      <section className="plot">
        <p className="plot-title">Plot</p>
        <p className="plot_description">{movie.Plot}</p>
      </section>
      <section className="poster">
        <img src={movie.Poster} key={movie.imdbID} alt={movie.Title} />
      </section>
      <section className="ratings">
        {movie.Ratings
          ? movie.Ratings.map(rate => {
              return (
                <Fragment key={rate.Source}>
                  <p className="ratings-source">{rate.Source}</p>
                  <p className="ratings-score">{rate.Value}</p>
                </Fragment>
              );
            })
          : null}
      </section>
    </Fragment>
  ) : null;
};

export default Details;
