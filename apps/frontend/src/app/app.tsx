/* CSS */
import '@fontsource/roboto/300.css';

/* Components */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TicketIOTask } from './components/task-view';

const theme = createTheme({
  palette: {
    primary: {
      main: '#291e4f',
    },
    secondary: {
      main: '#746b9e',
    },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <TicketIOTask/>
    </ThemeProvider>
  );
}

export default App;
