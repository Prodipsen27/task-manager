import React, { useContext } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ThemeContext from "../context/ThemeContext";

const ThemeSwitcher = () => {
  const { themeMode, setThemeMode } = useContext(ThemeContext);

  return (
    <FormControl fullWidth sx={{ marginBottom: "20px" }}>
      {/* <InputLabel>Theme</InputLabel> */}
      <Select value={themeMode} onChange={(e) => setThemeMode(e.target.value)}>
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
        <MenuItem value="yellow">Yellow Theme</MenuItem>
        <MenuItem value="blue">Light Blue Theme</MenuItem>
        <MenuItem value="system">System Default</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ThemeSwitcher;
