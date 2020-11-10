import {
  Container,
  Grid,
  Paper,
  Button,
  Typography,
  Icon,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";
import popcorn from "../../assets/img/popcorn.png";
import firebase from "firebase/app";
import { LoginWithButton, RegistrationModal, LoginModal } from "./modules";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../App";
import { Redirect } from "react-router";

import "firebase/auth";

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

const Login = () => {
  const styles = useStyles();

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [user] = useAuthState(auth);

  if (!!user) return <Redirect to="/" />;

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  return (
    <Container className={styles.root} maxWidth="md">
      <Grid container>
        <Grid item sm={12} md={6} className="w-100">
          <img className={styles.image} src={popcorn} alt="popcorn" />
        </Grid>
        <Grid item sm={12} md={6}>
          <Paper className={styles.paper}>
            <Typography variant="h6" className="">
              Witaj! W ramach tej aplikacji poprosimy Cię o ocenę paru filmów.
              Najpierw jednak chcielibyśmy wiedzieć, że jesteś człowiekiem
              <span role="img" aria-label="face-with-sweat">
                😅
              </span>
              .
              <br />
              Zapiszemy również twój postęp w ocenieniu, żebyś mógł później
              wrócić w to samo miejsce.
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

      <Paper className={styles.paperLower}>
        <Grid container spacing={2} className={styles.loginMethodContainer}>
          <Grid item md={4} sm={12} xs={12} className="text-center">
            <LoginWithButton
              authProvider={googleProvider}
              iconClassName="fa-google"
            >
              Zaloguj z Google
            </LoginWithButton>
          </Grid>
          <Grid item md={4} sm={12} xs={12} className="text-center">
            <LoginWithButton
              authProvider={facebookProvider}
              iconClassName="fa-facebook"
            >
              Zaloguj z Facebook
            </LoginWithButton>
          </Grid>
          <Grid item md={4} sm={12} xs={12} className="text-center">
            <Button onClick={openLoginModal} variant="contained">
              <Icon className={`fa fa-fw fa-envelope mr-2`} />
              Zaloguj z Email
            </Button>
            <RegistrationModal
              open={registerModalOpen}
              handleClose={closeRegisterModal}
              openLoginModal={openLoginModal}
            />
            <LoginModal
              open={loginModalOpen}
              handleClose={closeLoginModal}
              openRegisterModal={openRegisterModal}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
