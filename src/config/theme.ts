"use client";

import { createTheme } from "@mui/material";
import { green, grey } from "@mui/material/colors";

export const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IranYekan, Arial",
  },
  palette: {
    primary: {
      main: green[500],
    },
  },
  shape: {
    borderRadius: 8,
  },

  components: {
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: `1px solid ${grey[300]}`,
        },
      },
    },
  },
});
