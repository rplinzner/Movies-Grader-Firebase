import React from "react";
import useStyles from "./styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { themeMode, useAppTheme } from "../../contexts";
import { Divider, FormControlLabel, Hidden, Switch } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../App";
import defaultAvatar from "../../assets/img/default-avatar.png";

export default () => {
  const classes = useStyles();
  const { theme, changeTheme } = useAppTheme();
  const [user] = useAuthState(auth);

  const logout = () => auth.signOut();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Hidden xsDown={!!user} >
            <Typography variant="h6" className={user ? "" : classes.root}>
              Movies Grader
            </Typography>
          </Hidden>
          {!!user && (
            <>
              <Hidden xsDown>
                <Divider
                  className={classes.spacer}
                  orientation="vertical"
                  flexItem
                />
              </Hidden>
              <img
                className={classes.image}
                style={{ maxHeight: 50 }}
                src={user?.photoURL || defaultAvatar}
                alt="user-avatar"
              />
              <div className={classes.loginInfo}>
                <Hidden xsDown>
                  <Typography variant="body2">Zalogowany jako:</Typography>
                </Hidden>
                <Typography variant="body1">{user?.displayName}</Typography>
              </div>
            </>
          )}

          <FormControlLabel
            className="my-auto"
            control={
              <Switch
                checked={theme === themeMode.dark}
                onChange={changeTheme}
                name="switch-theme-mode"
              />
            }
            label="Tryb ciemny"
          />
          {user && (
            <Button className="my-auto" color="inherit" onClick={logout}>
              Wyloguj
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
