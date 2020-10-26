import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import darkTheme from "./themes/dark-theme";
import lightTheme from "./themes/light-theme";
import RoutedContent from "./pages";
import { AppBar } from "./layout";
import { themeMode, ThemeProvider } from "./contexts";
import tmdbLogo from "./assets/img/tmdb-logo.svg";
import "./App.css"

import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./constants";

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
auth.languageCode = "pl_PL";

function App() {
  return (
    <ThemeProvider>
      {(theme) => (
        <MuiThemeProvider
          theme={theme === themeMode.light ? lightTheme : darkTheme}
        >
          <img src={tmdbLogo} alt="logo_tmdb" className="logo_tmdb" />
          <CssBaseline />
          <BrowserRouter>
            <AppBar />
            <RoutedContent />
          </BrowserRouter>
        </MuiThemeProvider>
      )}
    </ThemeProvider>
  );
}

export default App;
