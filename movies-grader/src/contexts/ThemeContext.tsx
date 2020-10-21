import React, { ReactElement, useContext, useState } from "react";

export enum themeMode {
  dark,
  light,
}

interface IThemeContextType {
  theme: themeMode;
  changeTheme: () => void;
}

export const ThemeContext = React.createContext<IThemeContextType>(
  {} as IThemeContextType
);

interface Props {
  children?: (theme: themeMode) => ReactElement;
}

export const ThemeProvider = (props: Props) => {
  const { children } = props;
  const [theme, setTheme] = useState<themeMode>(themeMode.dark);
  const changeTheme = () => {
    setTheme((prev) =>
      prev === themeMode.dark ? themeMode.light : themeMode.dark
    );
  };
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children && children(theme)}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);
