import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createContext, useState, useEffect } from "react";

// Create Context for Theme
export const ThemeContext = createContext();

const getTheme = (mode) => {
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
      },
    }),
    yellow: createTheme({
      palette: {
        mode: "light",
        primary: { main: "#fdd835" }, // Yellow theme
        background: { default: "#fff9c4" },
      },
    }),
    lightblue: createTheme({
      palette: {
        mode: "light",
        primary: { main: "#64b5f6" }, // Light blue theme
        background: { default: "#e3f2fd" },
      },
    }),
  };
  return themes[mode] || themes.light;
};

const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("theme") || "system";
  const [themeMode, setThemeMode] = useState(storedTheme);

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (themeMode === "system") {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <MuiThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
