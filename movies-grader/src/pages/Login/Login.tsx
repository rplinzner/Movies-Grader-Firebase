import {
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";
import popcorn from "../../assets/img/popcorn.png";
import firebase from "firebase";
import { auth } from "../../App";
import resolveErrCode from "../../utils/firebase-error-message-resolver";

import { Alert } from "@material-ui/lab";

const Login = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleErrClose = () => setOpen(false);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      const { code, message } = error as firebase.auth.AuthError;
      setErrMsg(resolveErrCode(code, message));
      setOpen(true);
    }
  };

  const signInWithFacebook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      const { code, message } = error as firebase.auth.AuthError;
      setErrMsg(resolveErrCode(code, message));
      setOpen(true);
    }
  };

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
            <Button onClick={signInWithGoogle}>LOGIN with Google</Button>
          </Grid>
          <Grid item md={4} sm={6} xs={12} className="text-center">
            <Button onClick={signInWithFacebook}>LOGIN with Facebook</Button>
          </Grid>
          <Grid item md={4} sm={6} xs={12} className="text-center">
            LOGIN W EMAIL
          </Grid>
        </Grid>
      </Paper>

      <Snackbar open={open} autoHideDuration={10000} onClose={handleErrClose}>
        <Alert onClose={handleErrClose} severity="error">
          {errMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
