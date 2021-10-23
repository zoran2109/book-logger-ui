import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Main } from './Main';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#64967b',
      },
      background: {
        paper: '#f4eff2',
        default: '#eae0e5',
      },
    },
  });
  return (
    <div style={{ overflowX: 'hidden' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
