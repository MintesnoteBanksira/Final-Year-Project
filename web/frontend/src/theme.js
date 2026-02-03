import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00c6ff',
    },
    secondary: {
      main: '#0072ff',
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
  },
});

export default theme;
