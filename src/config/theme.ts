"use client";

import { createTheme, type GlobalStylesProps } from "@mui/material";
import { green, grey } from "@mui/material/colors";

export const globalStyles: GlobalStylesProps["styles"] = {
  a: {
    textDecoration: "none !important",
  },
};

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
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: "IranYekan";
        font-style: normal;
        font-weight: 700;
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebboldfanum.eot");
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebboldfanum.eot?#iefix")
          format("embedded-opentype");
        src: url("/assets/fonts/iranYekanWeb/woff/iranyekanwebboldfanum.woff")
          format("woff");
        src: url("/assets/fonts/iranYekanWeb/ttf/iranyekanwebboldfanum.ttf")
          format("truetype");
      }
      
      @font-face {
        font-family: "IranYekan";
        font-style: normal;
        font-weight: 100;
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebthinfanum.eot");
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebthinfanum.eot?#iefix")
          format("embedded-opentype");
        src: url("/assets/fonts/iranYekanWeb/woff/iranyekanwebthinfanum.woff")
          format("woff");
        src: url("/assets/fonts/iranYekanWeb/ttf/iranyekanwebthinfanum.ttf")
          format("truetype");
      }
      
      @font-face {
        font-family: "IranYekan";
        font-style: normal;
        font-weight: 300;
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanweblightfanum.eot");
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanweblightfanum.eot?#iefix")
          format("embedded-opentype");
        src: url("/assets/fonts/iranYekanWeb/woff/iranyekanweblightfanum.woff")
          format("woff");
        src: url("/assets/fonts/iranYekanWeb/ttf/iranyekanweblightfanum.ttf")
          format("truetype");
      }
      
      @font-face {
        font-family: "IranYekan";
        font-style: normal;
        font-weight: 400;
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebregularfanum.eot");
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebregularfanum.eot?#iefix")
          format("embedded-opentype");
        src: url("/assets/fonts/iranYekanWeb/woff/iranyekanwebregularfanum.woff")
          format("woff");
        src: url("/assets/fonts/iranYekanWeb/ttf/iranyekanwebregularfanum.ttf")
          format("truetype");
      }
      
      @font-face {
        font-family: "IranYekan";
        font-style: normal;
        font-weight: 400;
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebregularfanum.eot");
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebregularfanum.eot?#iefix")
          format("embedded-opentype");
        src: url("/assets/fonts/iranYekanWeb/woff/iranyekanwebregularfanum.woff")
          format("woff");
        src: url("/assets/fonts/iranYekanWeb/ttf/iranyekanwebregularfanum.ttf")
          format("truetype");
      }
      
      @font-face {
        font-family: "IranYekan";
        font-style: normal;
        font-weight: 500;
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebmediumfanum.eot");
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebmediumfanum.eot?#iefix")
          format("embedded-opentype");
        src: url("/assets/fonts/iranYekanWeb/woff/iranyekanwebmediumfanum.woff")
          format("woff");
        src: url("/assets/fonts/iranYekanWeb/ttf/iranyekanwebmediumfanum.ttf")
          format("truetype");
      }
      
      @font-face {
        font-family: "IranYekan";
        font-style: normal;
        font-weight: 600;
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebmediumfanum.eot");
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebmediumfanum.eot?#iefix")
          format("embedded-opentype");
        src: url("/assets/fonts/iranYekanWeb/woff/iranyekanwebmediumfanum.woff")
          format("woff");
        src: url("/assets/fonts/iranYekanWeb/ttf/iranyekanwebmediumfanum.ttf")
          format("truetype");
      }
      
      @font-face {
        font-family: "IranYekan";
        font-style: normal;
        font-weight: 800;
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebextraboldfanum.eot");
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebextraboldfanum.eot?#iefix")
          format("embedded-opentype");
        src: url("/assets/fonts/iranYekanWeb/woff/iranyekanwebextraboldfanum.woff")
          format("woff");
        src: url("/assets/fonts/iranYekanWeb/ttf/iranyekanwebextraboldfanum.ttf")
          format("truetype");
      }
      
      @font-face {
        font-family: "IranYekan";
        font-style: normal;
        font-weight: 900;
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebblackfanum.eot");
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebblackfanum.eot?#iefix")
          format("embedded-opentype");
        src: url("/assets/fonts/iranYekanWeb/woff/iranyekanwebblackfanum.woff")
          format("woff");
        src: url("/assets/fonts/iranYekanWeb/ttf/iranyekanwebblackfanum.ttf")
          format("truetype");
      }
      
      @font-face {
        font-family: "IranYekan";
        font-style: normal;
        font-weight: 950;
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebextrablackfanum.eot");
        src: url("/assets/fonts/iranYekanWeb/eot/iranyekanwebextrablackfanum.eot?#iefix")
          format("embedded-opentype");
        src: url("/assets/fonts/iranYekanWeb/woff/iranyekanwebextrablackfanum.woff")
          format("woff");
        src: url("/assets/fonts/iranYekanWeb/ttf/iranyekanwebextrablackfanum.ttf")
          format("truetype");
      }
      `,
    },
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
