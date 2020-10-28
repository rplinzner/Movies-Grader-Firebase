import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    form: {
      padding: theme.spacing(3),
    },
    field: {
      marginBottom: theme.spacing(3),
    },
    fieldError: {
      marginBottom: theme.spacing(1),
    }
  })
);
