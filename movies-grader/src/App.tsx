import { MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import darkTheme from "./themes/dark-theme";
import RoutedContent from "./pages";

function App() {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <RoutedContent />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
