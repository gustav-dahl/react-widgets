import { CssBaseline, ThemeProvider } from '@mui/material';
import { Page1 } from 'pages/Page1';
import { mainTheme } from 'styles';

function App() {
  return (
    <div style={{ height: '100vh', padding: '10rem' }}>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Page1 />
      </ThemeProvider>
    </div>
  );
}

export default App;
