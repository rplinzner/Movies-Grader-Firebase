import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    spacer: {
      [theme.breakpoints.down("xs")]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    image: {
      borderRadius: 100,
      marginRight: theme.spacing(2)
    },
    loginInfo: {
      flexGrow: 1,
    },
  })
);
