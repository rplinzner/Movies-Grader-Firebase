import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import useStyles from "./styles";
import classNames from "classnames";
import Rating from "react-rating";
import { useTmdbConfig } from "../../contexts/TmdbConfigContext";
import { fetchMovieInfo } from "../../utils/tmdb-fetchers";

const Grades = () => {
  const classes = useStyles();

  const onRankClick = (value: number) => window.alert(value);

  const [fadeIn, setFadeIn] = useState(false);
  const [overview, setOverview] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [directors, setDirectors] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const { baseUrl } = useTmdbConfig();

  const [movieId, setMovieId] = useState(100);

  useEffect(() => {
    async function inner() {
      if (!baseUrl) return;

      const {
        directors: dirs,
        overview: desc,
        poster,
        title: movieTitle,
        releaseDate,
      } = await fetchMovieInfo(baseUrl, movieId);
      setPosterUrl(poster);
      setOverview(desc);
      setDirectors(dirs.map((e) => e.name));
      setTitle(`${movieTitle} (${releaseDate})`);
      // Scroll to top on new data
      document.querySelector("#app-bar")?.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        setFadeIn(true);
      }, 200);
    }
    setFadeIn(false);
    setTimeout(() => inner(), 200);
  }, [baseUrl, movieId]);

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
                  emptySymbol="fa fa-star-o fa-2x"
                  fullSymbol="fa fa-star fa-2x"
                  initialRating={0}
                  stop={6}
                  onClick={onRankClick}
                />
              </div>
              {/* TODO: replace with proper logic */}
              <Button
                onClick={() => setMovieId((prev) => prev + 1)}
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
