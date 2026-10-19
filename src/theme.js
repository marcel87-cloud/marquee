import { createTheme } from '@mui/material';

export default createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#f2b84b' },
    background: { default: '#10151c', paper: '#1a212b' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
    h4: { fontWeight: 800 },
    h5: { fontWeight: 600 },
  },
});
