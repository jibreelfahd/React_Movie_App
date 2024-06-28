import React from "react";

import styles from "./Movie.module.css";

const Movie = ({ tittle, openingText, releaseDate }) => {
  return (
    <li className={styles.movie}>
      <h2>{tittle}</h2>
      <h3>{releaseDate}</h3>
      <p>{openingText}</p>
    </li>
  );
};

export default Movie;
