import React, { useState } from "react";
import firebase from "firebase";
import { Button, Icon, Snackbar } from "@material-ui/core";
import { auth } from "../../../../App";
import resolveErrCode from "../../../../utils/firebase-error-message-resolver";
import { Alert } from "@material-ui/lab";

interface Props {
  iconClassName: string;
  authProvider: firebase.auth.AuthProvider;
  children: string;
}

const LoginWithButton = (props: Props) => {
  const { authProvider, iconClassName, children } = props;

  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleErrClose = () => setOpen(false);

  const buttonClickHandler = async () => {
    try {
      await auth.signInWithPopup(authProvider);
    } catch (error) {
      const { code, message } = error as firebase.auth.AuthError;
      setErrMsg(resolveErrCode(code, message));
      setOpen(true);
    }
  };
  return (
    <>
      <Button onClick={buttonClickHandler} variant="contained">
        <Icon className={`fa fa-fw ${iconClassName} mr-2`} />
        {children}
      </Button>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleErrClose}>
        <Alert onClose={handleErrClose} severity="error">
          {errMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginWithButton;
