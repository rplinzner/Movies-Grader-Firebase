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
  openLoginModal: () => void;
  handleClose: () => void;
}

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegistrationModal = (props: Props) => {
  const { open, openLoginModal, handleClose } = props;
  const [error, setError] = useState("");
  const styles = useStyles();

  const { handleSubmit, register, errors, getValues } = useForm<FormValues>();

  const onSubmit = (values: FormValues) =>
    handleRegister(values.email, values.password);

  const handleRegister = (email: string, password: string) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(handleClose)
      .catch((error) => {
        setError("Konto z podanym adresem email już istnieje.");
      });
  };
  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <DialogTitle>Zarejestruj się</DialogTitle>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            className={styles.field}
            autoFocus
            inputRef={register({
              required: "Pole jest wymagane.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Niepoprawny email",
              },
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
              minLength: {
                value: 6,
                message: "Minimalna długość hasła - 6 znaków.",
              },
            })}
            label="Hasło"
            type="password"
            name="password"
            fullWidth
          />
          <p className={styles.fieldError}>
            {errors.password && errors.password.message}
          </p>
          <TextField
            className={styles.field}
            inputRef={register({
              required: "Pole jest wymagane.",
              validate: (value) =>
                value === getValues("password") || "Hasła nie są identyczne.",
            })}
            label="Powtórz hasło"
            name="confirmPassword"
            type="password"
            fullWidth
          />
          <p className={styles.fieldError}>
            {errors.confirmPassword && errors.confirmPassword.message}
          </p>

          {!!error && <p className={styles.fieldError}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={openLoginModal}>
            Mam już konto
          </Button>
          <Button color="primary" onClick={() => handleClose()}>
            Anuluj
          </Button>
          <Button type="submit" color="primary">
            Zarejestruj
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RegistrationModal;
