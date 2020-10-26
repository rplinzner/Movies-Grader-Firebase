import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import firebase from "firebase";
import useStyles from "./styles";

interface Props {
  open: boolean;
  openRegisterModal: () => void;
  handleClose: () => void;
}

type FormValues = {
  email: string;
  password: string;
};

const LoginModal = (props: Props) => {
  const { open, openRegisterModal, handleClose } = props;
  const [error, setError] = useState("");
  const styles = useStyles();

  const { handleSubmit, register, errors } = useForm<FormValues>();
  const onSubmit = (values: FormValues) =>
    handleLogin(values.email, values.password);

  const handleLogin = (email: string, password: string) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(handleClose)
      .catch(() => {
        setError("Błędna nazwa użytkownika lub hasło.");
      });
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <DialogTitle>Zaloguj się</DialogTitle>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            className={styles.field}
            autoFocus
            inputRef={register({
              required: "Pole jest wymagane.",
            })}
            label="Adres e-mail"
            type="email"
            name="email"
            fullWidth
          />
          <p className={styles.fieldError}>
            {errors.email && errors.email.message}
          </p>
          <TextField
            className={styles.field}
            inputRef={register({
              required: "Pole jest wymagane.",
            })}
            label="Hasło"
            type="password"
            name="password"
            fullWidth
          />
          <p className={styles.fieldError}>
            {errors.password && errors.password.message}
          </p>
          {!!error && <p className={styles.fieldError}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={openRegisterModal}>
            Nie mam jeszcze konta
          </Button>
          <Button color="primary" onClick={handleClose}>
            Anuluj
          </Button>
          <Button type="submit" color="primary">
            Zaloguj
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LoginModal;
