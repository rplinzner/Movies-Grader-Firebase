import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

import React, { useEffect, useMemo, useState } from "react";
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
  }, [baseUrl, currentMovieIndex, movies]);

  const onRankClick = (value: number) => rateMovie(value, true);

  const allMoviesCount = useMemo(() => movies.length, [movies]);
  const ratedMoviesCount = movies.filter((c) => c.rated).length;

  const getProgressPercentage = () => {
    const divider = allMoviesCount;
    const dividend = ratedMoviesCount;
    return (dividend / divider) * 100;
  };

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
      <Box display="flex" alignItems="center" mt={1}>
        <Box width="100%" mr={1}>
          <LinearProgress
            variant="determinate"
            value={getProgressPercentage()}
          />
        </Box>
        <Box minWidth={50}>
          <Typography variant="body2" color="textSecondary">
            {`Oceniono ${Math.round(
              getProgressPercentage()
            )}% (${ratedMoviesCount}/${allMoviesCount}) filmów`}
          </Typography>
        </Box>
      </Box>
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
              {movies[currentMovieIndex]?.rated && (
                <Typography className={classes.ratedText}>{`Aktualna ocena: ${
                  movies[currentMovieIndex]?.haveSeen === false
                    ? "Nie widziałem/am"
                    : movies[currentMovieIndex]?.rate
                }`}</Typography>
              )}
              <div className={classes.ratingContainer}>
                <Typography className={classes.rateText}>{`${
                  movies[currentMovieIndex]?.rated ? "Zmień ocenę" : "Oceń"
                }:`}</Typography>

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
              <div className={classes.navButtonsContainer}>
                {currentMovieIndex > 0 && (
                  <Button
                    aria-label="left"
                    onClick={() => setCurrentMovieIndex(currentMovieIndex - 1)}
                    startIcon={<ChevronLeft />}
                    variant="contained"
                    color="secondary"
                    className={classes.navButton}
                  >
                    Wstecz
                  </Button>
                )}

                {currentMovieIndex < lastRatedIndex && (
                  <Button
                    aria-label="right"
                    startIcon={<ChevronRight />}
                    variant="contained"
                    onClick={() => setCurrentMovieIndex(currentMovieIndex + 1)}
                    color="secondary"
                    className={classes.navButton}
                  >
                    Następny
                  </Button>
                )}
              </div>
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
