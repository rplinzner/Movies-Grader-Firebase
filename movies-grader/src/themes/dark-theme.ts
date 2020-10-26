import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@material-ui/core";
import { cyan, lime } from "@material-ui/core/colors";

export default responsiveFontSizes(
  createMuiTheme({
    direction: "ltr",
    palette: {
      type: "dark",
      primary: cyan,
      secondary: lime,
    },
  } as ThemeOptions)
);
