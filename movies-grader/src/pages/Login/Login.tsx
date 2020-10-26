import { Container, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import popcorn from "../../assets/img/popcorn.png";
import firebase from "firebase";
import LoginWithButton from "./modules/LoginWithButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../App";
import { Redirect } from "react-router";

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

const Login = () => {
  const styles = useStyles();

  const [user] = useAuthState(auth);

  if (!!user) return <Redirect to="/" />;

  return (
    <Container className={styles.root} maxWidth="md">
      <Grid container>
        <Grid item sm={12} md={6} className="w-100">
          <img className={styles.image} src={popcorn} alt="popcorn" />
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={styles.paper}>
            <Typography variant="h5" className="">
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
              <span role="img" aria-label="face-wink">
                😉
              </span>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper className={styles.paper}>
        <Grid container spacing={2} className={styles.loginMethodContainer}>
          <Grid item md={4} sm={6} xs={12} className="text-center">
            {/* TODO: Dodać klawisze zgodne z providerem */}
            <LoginWithButton
              authProvider={googleProvider}
              iconClassName="fa-google"
            >
              Zaloguj z Google
            </LoginWithButton>
          </Grid>
          <Grid item md={4} sm={6} xs={12} className="text-center">
            <LoginWithButton
              authProvider={facebookProvider}
              iconClassName="fa-facebook"
            >
              Zaloguj z Facebook
            </LoginWithButton>
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
