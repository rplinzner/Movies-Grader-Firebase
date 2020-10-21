import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export default responsiveFontSizes(
  createMuiTheme({
    direction: "ltr",
    palette: {
      type: "dark",
      primary: {
        main: "#4caf50",
      },
      secondary: {
        main: red[400],
      },
    },
  } as ThemeOptions)
);
