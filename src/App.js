import React, { useState, useCallback, useEffect } from "react";

import MovieList from "./components/Movies/MovieList";
import Card from "./components/UI/Card/Card";
import AddMovie from "./components/Movies/AddMovie";

import styles from "./App.module.css";
import Button from "./components/UI/Button/Button";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("Something went wrong, Try Again Later!!");
      }
      const data = await response.json();

      const transformedData = data.results.map((moviesData) => {
        return {
          id: moviesData.episode_id,
          tittle: moviesData.title,
          openingText: moviesData.opening_crawl,
          releaseDate: moviesData.release_date,
        };
      });

      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    const response = await fetch('https://swapi.dev/api/films', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <Card className={styles["fetch--movies"]}>
        <Button onClick={fetchMoviesHandler}>Fetch Movies</Button>
      </Card>
      <section>
        {!isLoading && (
          <MovieList
            movies={movies}
            isMovieLoading={isLoading}
            isError={error}
          />
        )}
      </section>
    </>
  );
};

export default App;
