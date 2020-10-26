import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export default responsiveFontSizes(
  createMuiTheme({
    direction: "ltr",
    palette: {
      type: "dark",
      primary: blue
    },
  } as ThemeOptions)
);
