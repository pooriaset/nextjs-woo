"use client";

import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

export const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Vazir, Arial",
  },
  palette: {
    primary: {
      main: green[500],
    },
  },
});
