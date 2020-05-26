import {
    grey,
    orange
  } from '@material-ui/core/colors';
  
  export default {
    palette: {
      primary: {
        light: grey[300],
        main: grey[700],
        dark: grey[900],
      },
      secondary: {
        light: orange[500],
        main: orange[700],
        dark: orange[900],
      },
      // primary: {
      //   light: orange, // same as '#FFCC80',
      //   main: purple[700], // same as orange[600]
      //   dark: '#EF6C00',
      //   contrastText: 'rgb(0,0,0)',
      // },
    },
    overrides: {
      MuiButton: {
        root: {
          margin: '10px 5px',
        },
      },
      MuiTextField: {
        root: {
          margin: '5px 0px',
        },
      },
      MuiFormControl: {
        root: {
          margin: '5px 0px',
        },
      },
      MuiCircularProgress: {
        root: {
          display: 'block',
          margin: '0 auto',
        },
      },
    },
    typography: {
      useNextVariants: true,
    },
  };
  