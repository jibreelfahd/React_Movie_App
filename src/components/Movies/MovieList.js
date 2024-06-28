import React from "react";

import Movie from "./Movie";
import styles from "./MovieList.module.css";
import Card from "../UI/Card/Card";

const MovieList = ({ movies, isMovieLoading, isError }) => {
  const movie = movies.map((movie) => (
    <Movie
      key={movie.id}
      tittle={movie.tittle}
      openingText={movie.openingText}
      releaseDate={movie.releaseDate}
    />
  ));

  //setting dynamic content based on server response
  let content = <p>No Movies Available</p>;

  if (movies.length > 0) {
    content = <ul>{movie}</ul>;
  }

  if (!isMovieLoading && isError) {
    content = <p>{isError}</p>;
  }

  if (isMovieLoading) {
    content = <p>Loading...</p>;
  }
  return <Card className={styles["movie--list"]}>{content}</Card>;
};

export default MovieList;
