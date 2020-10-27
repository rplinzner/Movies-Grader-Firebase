import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import useStyles from "./styles";
import classNames from "classnames";
import Rating from "react-rating";
import { useTmdbConfig } from "../../contexts/TmdbConfigContext";
import { fetchMovieInfo } from "../../utils/tmdb-fetchers";
import {
  getUserMovies,
  rateUserMovie,
  Movie,
} from "../../utils/firebase-db-methods";

const Grades = () => {
  const classes = useStyles();

  const [fadeIn, setFadeIn] = useState(false);
  const [overview, setOverview] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [directors, setDirectors] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<Movie>();

  const isLoaded = useRef(false);

  useEffect(() => {
    setFadeIn(true);
    async function inner() {
      const userMovies = await getUserMovies();
      const lastMovie = userMovies.pop();
      setMovies(userMovies);
      setCurrentMovie(lastMovie);
      isLoaded.current = true;
    }
    inner();
  }, []);

  const { baseUrl } = useTmdbConfig();

  useEffect(() => {
    async function inner() {
      if (!baseUrl || !currentMovie) return;

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
  }, [baseUrl, currentMovie]);

  const onRankClick = (value: number) => rateMovie(value, true);

  const rateMovie = async (rate: number, haveSeen: boolean) => {
    if (!currentMovie) {
      return;
    }
    await rateUserMovie(currentMovie, rate, haveSeen);
    const lastMovie = movies.pop();
    setCurrentMovie(lastMovie);
  };

  if (isLoaded.current && movies.length === 0)
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
                  initialRating={0}
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
