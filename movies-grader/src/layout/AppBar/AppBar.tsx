import React from "react";
import useStyles from "./styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { themeMode, useAppTheme } from "../../contexts";
import { FormControlLabel, Switch } from "@material-ui/core";

export default () => {
  const classes = useStyles();
  const { theme, changeTheme } = useAppTheme();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Movie Grader
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={theme === themeMode.dark}
                onChange={changeTheme}
                name="switch-theme-mode"
              />
            }
            label="Tryb ciemny"
          />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
