import { createMuiTheme } from '@material-ui/core/styles'
import { red, blue } from '@material-ui/core/colors'

const theme = createMuiTheme({
  pallete: {
    primary: {
      main: blue[300],
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontSize: 14,
    h2: {
      fontWeight: 500,
      fontSize: 29,
      letterSpacing: '-0.24px',
    },
    h3: {
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: '-0.06px',
    },
    h4: {
      fontWeight: 500,
      fontSize: 20,
      letterSpacing: '-0.06px',
    },
    h5: {
      fontWeight: 500,
      fontSize: 16,
      letterSpacing: '-0.05px',
    },
    h6: {
      fontWeight: 500,
      fontSize: 14,
      letterSpacing: '-0.05px',
    },
    overline: {
      fontWeight: 500,
    },
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
      size: 'small',
    },
    MuiCircularProgress: {
      size: '1rem',
    },
    MuiSnackbar: {
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    },
    MuiFormControl: {
      size: 'small',
    },
  },
  // overrides: {
  //   MuiAppBar: {
  //     colorPrimary: {
  //       backgroundColor: '#2c3d48',
  //     },
  //   },
  // },
})

export default theme
