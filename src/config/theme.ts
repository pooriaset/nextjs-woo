'use client';

import { Link } from '@/navigation';
import {
  ThemeOptions,
  createTheme,
  type GlobalStylesProps,
} from '@mui/material';
import { green, grey } from '@mui/material/colors';

export const globalStyles: GlobalStylesProps['styles'] = (theme) => ({
  a: {
    textDecoration: 'none !important',
  },
  ':root': {
    '--swiper-pagination-color': '#fff',
    '--swiper-navigation-color': '#fff',
    '--swiper-navigation-size': 28,
  },
  '.swiper-button-next,.swiper-button-prev': {
    textShadow: '0px 0px 4px ' + grey[500],
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: '#fff',
    color: grey[700],
    borderRadius: '50%',
    width: 36,
    height: 36,
    transform: 'translate(0, -50%)',
  },
  '.swiper-pagination': {
    left: '50% !important',
    transform: 'translateX(-50%)',
    width: 'fit-content !important',
    transition: 'all 200ms ease',
  },
  '.swiper-pagination-bullet.swiper-pagination-bullet-active': {
    width: 16,
    borderRadius: 8,
  },
});

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: green[500],
      contrastText: '#fff',
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
