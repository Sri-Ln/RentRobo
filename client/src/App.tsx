import AppRouter from './Routes';
import './App.css'
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Ensures consistent styling */}
        <AppRouter />
      </ThemeProvider>
    </>
  )
}

export default App
