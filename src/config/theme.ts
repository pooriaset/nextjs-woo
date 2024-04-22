'use client';

import { Link } from '@/navigation';
import {
  ThemeOptions,
  createTheme,
  type GlobalStylesProps,
} from '@mui/material';
import { green, grey } from '@mui/material/colors';

export const globalStyles: GlobalStylesProps['styles'] = {
  a: {
    textDecoration: 'none !important',
  },
};

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: green[500],
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: Link,
      },
    },
    MuiBottomNavigationAction: {
      defaultProps: {
        component: Link,
      },
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
    MuiCssBaseline: {
      styleOverrides: `
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 100;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum01Hairline.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum01Hairline.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum01Hairline.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum01Hairline.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 200;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum02Thin.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum02Thin.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum02Thin.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum02Thin.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 300;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum03Light.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum03Light.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum03Light.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum03Light.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 400;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum04Regular.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum04Regular.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum04Regular.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum04Regular.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 500;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum05Medium.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum05Medium.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum05Medium.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum05Medium.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 600;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum06Bold.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum06Bold.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum06Bold.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum06Bold.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 700;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum07Heavy.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum07Heavy.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum07Heavy.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum07Heavy.ttf")
        format("truetype");
    }
    
    @font-face {
      font-family: 'YekanBakh';
      font-style: normal;
      font-weight: 800;
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum08Fat.eot");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum08Fat.eot?#iefix")
        format("embedded-opentype");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum08Fat.woff")
        format("woff");
      src: url("/assets/fonts/yekanBakh/YekanBakhFaNum08Fat.ttf")
        format("truetype");
    }
    `,
    },
  },
};

export const defaultTheme = createTheme({
  ...themeOptions,
});

export const persianTheme = createTheme({
  ...themeOptions,
  direction: 'rtl',
  typography: {
    fontFamily: "'YekanBakh'," + defaultTheme.typography.fontFamily,
  },
});
