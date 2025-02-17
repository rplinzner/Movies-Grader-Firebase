import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "calc(100vh - 80px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
    },
    posterContainer: {
      [theme.breakpoints.down("sm")]: {
        height: "40%",
      },
      [theme.breakpoints.up("sm")]: {
        height: "55%",
      },
      minHeight: "150px",
      marginTop: theme.spacing(2),
      flexShrink: 2,
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    poster: {
      borderRadius: 5,
      height: "100%",
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
    },
    title: {
      fontWeight: "bold",
    },
    director: {
      marginTop: theme.spacing(2),
      fontWeight: "bold",
    },
    description: {
      marginTop: theme.spacing(3),
    },
    ratingContainer: {
      marginTop: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
    },
    rateText: {
      [theme.breakpoints.down("xs")]: {
        textAlign: "center",
        width: "100%",
      },
    },
    ratedText: {
      textAlign: "center",
      width: "100%",
      fontWeight: "bold",
      marginTop: theme.spacing(1),
    },
    rating: {
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing(1),
      },
    },
    button: {
      marginTop: theme.spacing(3),
    },
    navButtonsContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyItems: "center",
      alignItems: "center",
    },
    navButton: {
      margin: theme.spacing(1),
    },
  })
);
