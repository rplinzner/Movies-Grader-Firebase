import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   display: "flex",
      //   justifyItems: "center",
    },
    paper: {
      padding: theme.spacing(3),
      marginTop: theme.spacing(3),
    },
    image: {
      [theme.breakpoints.down("sm")]: {
        maxHeight: 150,
      },
      [theme.breakpoints.up("sm")]: {
        maxHeight: 300,
      },
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      display: "block",
    },
    loginMethodContainer: {
      display: "flex",
      justifyItems: "center",
      width: "100%",
    },
  })
);
