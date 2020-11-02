import {
  Button,
  IconButton,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Paper,
  Typography,
} from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import classNames from "classnames";
import Rating from "react-rating";
import { useTmdbConfig } from "../../contexts/TmdbConfigContext";
import { fetchMovieInfo } from "../../utils/tmdb-fetchers";
import {
  getUserMovies,
  updateGrades,
  Grade,
} from "../../utils/firebase-db-methods";

const Grades = () => {
  const classes = useStyles();

  const [fadeIn, setFadeIn] = useState(false);
  const [overview, setOverview] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [directors, setDirectors] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState<Grade[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState<number>(-1);
  const [lastRatedIndex, setLastRatedIndex] = useState<number>(-1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    async function inner() {
      const userMovies = await getUserMovies();
      setMovies(userMovies);

      const index = userMovies.findIndex((c) => c.rated === false);
      setLastRatedIndex(index);
      setCurrentMovieIndex(index);
      setIsLoaded(true);
    }
    inner();
  }, []);

  const { baseUrl } = useTmdbConfig();

  useEffect(() => {
    async function inner() {
      if (!baseUrl || currentMovieIndex === -1) return;

      const currentMovie = movies[currentMovieIndex];
      const {
        directors: dirs,
        overview: desc,
        poster,
        title: movieTitle,
        releaseDate,
      } = await fetchMovieInfo(baseUrl, parseInt(currentMovie.tmdb_id));
      setPosterUrl(poster);
      setOverview(desc);
      setDirectors(dirs.map((e) => e.name));
      setTitle(`${movieTitle} (${releaseDate})`);
      // Scroll to top on new data
      document
        .querySelector("#app-bar")
        ?.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        setFadeIn(true);
      }, 200);
    }
    setFadeIn(false);
    setTimeout(() => inner(), 200);
  }, [baseUrl, currentMovieIndex]);

  const onRankClick = (value: number) => rateMovie(value, true);

  const rateMovie = async (rate: number, haveSeen: boolean) => {
    if (currentMovieIndex === -1) {
      return;
    }

    movies[currentMovieIndex].rate = rate;
    movies[currentMovieIndex].haveSeen = haveSeen;
    movies[currentMovieIndex].rated = true;

    await updateGrades(movies);

    if (currentMovieIndex < movies.length - 1) {
      setCurrentMovieIndex(currentMovieIndex + 1);
      setLastRatedIndex(currentMovieIndex + 1);
    } else {
      setCurrentMovieIndex(-1);
    }
  };

  if (isLoaded && currentMovieIndex === -1)
    return (
      <Container maxWidth="md" className={classNames(classes.root, "mt-3")}>
        <Typography className={classes.title} variant="h4">
          To wszystko na teraz! Wróć później.
        </Typography>
      </Container>
    );

  return (
    <>
      {title ? (
        <Fade in={fadeIn}>
          <Container maxWidth="md" className={classes.root}>
            <div className={classes.posterContainer}>
              <img
                className={classNames(classes.poster, "shadow")}
                src={posterUrl}
                alt="movie_poster"
              />
            </div>
            <Paper className={classes.paper}>
              <Typography className={classes.title} variant="h4">
                {title}
              </Typography>
              <Typography className={classes.director} variant="h5">
                {`Reżyseria: ${directors.join(", ")}`}
              </Typography>

              <Typography className={classes.description}>
                {overview}
              </Typography>
              <Divider flexItem orientation="horizontal" />
              <div className={classes.ratingContainer}>
                <Typography>Oceń:</Typography>
                <Rating
                  className={classes.rating}
                  emptySymbol="fa fa-star-o fa-2x mx-2"
                  fullSymbol="fa fa-star fa-2x mx-2"
                  initialRating={movies[currentMovieIndex].rate}
                  stop={6}
                  onClick={onRankClick}
                />
              </div>
              <Button
                onClick={() => rateMovie(0, false)}
                className={classes.button}
                variant="contained"
              >
                Nie widziałem/am filmu
              </Button>
              {currentMovieIndex > 0 && (
                <IconButton
                  aria-label="left"
                  onClick={() => setCurrentMovieIndex(currentMovieIndex - 1)}
                >
                  <ChevronLeft />
                </IconButton>
              )}
              {currentMovieIndex < lastRatedIndex && (
                <IconButton
                  aria-label="right"
                  onClick={() => setCurrentMovieIndex(currentMovieIndex + 1)}
                >
                  <ChevronRight />
                </IconButton>
              )}
            </Paper>
          </Container>
        </Fade>
      ) : (
        <div className="d-flex mt-3">
          <CircularProgress className="mx-auto" />
        </div>
      )}
    </>
  );
};

export default Grades;
