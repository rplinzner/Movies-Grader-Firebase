import { Container, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import popcorn from "../../assets/img/popcorn.png";

const Login = () => {
  const styles = useStyles();
  return (
    <Container className={styles.root} maxWidth="md">
      <Paper className={styles.paper}>
        <img className={styles.image} src={popcorn} alt="popcorn" />
        <Typography variant="h5" className="text-justify">
          Witaj! W ramach tej aplikacji poprosimy Cię o ocenę paru filmów.
          Najpierw jednak chcielibyśmy wiedzieć, że jesteś człowiekiem
          <span role="img" aria-label="face-with-sweat">
            😅
          </span>
          .
          <br />
          <br />
          Wybierz jedną z poniższych opcji logowania.
        </Typography>
        <Typography variant="caption">
          Psst. Nie będziemy zbierać żadnych Twoich osobistych informacji
          <span role="img" aria-label="face-with-sweat">
            😉
          </span>
        </Typography>
      </Paper>
      <Paper className={styles.paper}>
        <Grid container spacing={4} className={styles.loginMethodContainer}>
          <Grid item md={4} sm={6} xs={12} className="text-center">
            LOGIN W GOOGLE
          </Grid>
          <Grid item md={4} sm={6} xs={12} className="text-center">
            LOGIN W Apple
          </Grid>
          <Grid item md={4} sm={6} xs={12} className="text-center">
            LOGIN W EMAIL
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
