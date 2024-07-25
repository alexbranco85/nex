'use client'

import { createTheme } from '@mui/material/styles';
import { Titillium_Web } from "next/font/google";

const titillium = Titillium_Web({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
    text: {
      primary: '#dadada',
      secondary: '#dadada',
    },
  },
  typography: {
    allVariants: {
      color: '#dadada',
      fontFamily: titillium.style.fontFamily
    },
    body1: {
      fontSize: '16px'
    },
    body2: {
      fontSize: '14px'
    },
    link: {
      color: '#38baab',
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#dadada',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#dadada',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#a563ff',
          transition: 'color 0.3s ease-in',
          textDecoration: 'none',
          '&:hover': {
            color: '#dadada',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#dadada',
          backgroundColor: '#7c40cf',
          '&:hover': {
            backgroundColor: '#a563ff',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#dadada',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7c40cf',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#dadada',
          '&.Mui-focused': {
            color: '#7c40cf',
          },
        },
      },
    },
  },
});

export default theme;