import React, { createContext, useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeModeContext = createContext();

export default function ThemeModeProvider({ children }) {
  const prefersDarkMode = useMemo(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    []
  );

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || (prefersDarkMode ? "dark" : "light");
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const activeTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeModeContext.Provider value={{ theme, toggleThemeMode }}>
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
