import React, { createContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Define custom themes
const themes = {
  light: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#1976d2" },
    },
  }),
  dark: createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#90caf9" },
      background: { default: "#121212", paper: "#1e1e1e" },
    },
  }),
  yellow: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#ffeb3b" },
      background: { default: "#fffde7", paper: "#fff9c4" },
    },
  }),
  blue: createTheme({
    palette: {
      mode: "light",
      primary: { main: "#64b5f6" },
      background: { default: "#e3f2fd", paper: "#bbdefb" },
    },
  }),
};

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  // Load theme from localStorage or default to system preference
  const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [themeMode, setThemeMode] = useState(getPreferredTheme());

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={themes[themeMode] || themes.light}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
