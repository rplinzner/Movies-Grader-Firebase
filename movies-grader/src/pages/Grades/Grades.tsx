import {
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import classNames from "classnames";
import Rating from "react-rating";

const Grades = () => {
  const classes = useStyles();

  const onRankClick = (value: number) => window.alert(value);

  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.posterContainer}>
        <img
          className={classNames(classes.poster, "shadow")}
          src="https://fwcdn.pl/fpo/10/39/1039/7732437.3.jpg"
          alt="movie_poster"
        />
      </div>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h4">
          PULP FICTION
        </Typography>
        <Typography className={classes.director} variant="h5">
          Reżyseria: Quentin Tarrantino
        </Typography>

        <Typography className={classes.description}>
          Przemoc i odkupienie w opowieści o dwóch płatnych mordercach
          pracujących na zlecenie mafii, żonie gangstera, bokserze i parze
          okradającej ludzi w restauracji
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
        <Button className={classes.button} variant="contained">
          Nie widziałem/am filmu
        </Button>
      </Paper>
    </Container>
  );
};

export default Grades;
