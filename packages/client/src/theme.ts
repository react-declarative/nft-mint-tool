import { createTheme } from "@mui/material";

const THEME_LIGHT = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#1976d2',
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.38)",
        },
        background: {
            default: "zz",
            paper: "#f5f5f5",
        },
    }
});

const THEME_DARK = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90cbf9',
      },
      secondary: {
        main: '#90cbf9',
      },
      text: {
        primary: "#fff",
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
      },
      background: {
        paper: "#424242",
        default: "#212121",
      },
    },
  });


export default THEME_DARK;
