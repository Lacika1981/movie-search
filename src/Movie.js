import React, { Fragment, useEffect, useState } from 'react';
import Nav from './Nav';

export default function Movie(props) {
  console.log(props.clickedMovie);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch(
        `http://www.omdbapi.com/?i=${props.clickedMovie}&apikey=7f555475`
      )
        .then(response => response.json())
        .then(json => setMovie(json));
    }
    fetchData();
  }, [props]);

  console.log(movie);

  return (
    <Fragment>
      <p>{movie.Title}</p>
    </Fragment>
  );
}
