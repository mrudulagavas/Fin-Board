// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  CssBaseline,
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material';
import StockRatiosDashboard from './StockRatiosDashboard';
import StockScreener from './StockScreener';
import FileManagementDashboard from './FileManagementDashboard';
import { indigo, deepPurple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: deepPurple[500],
    },
    background: {
      default: '#0a1929',
      paper: '#001e3c',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="sticky" elevation={0} sx={{ background: 'linear-gradient(135deg, #0a1929 0%, #001e3c 100%)' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ 
              flexGrow: 1,
              fontWeight: 700,
              background: 'linear-gradient(90deg, #b388ff 0%, #7c4dff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              FINANALYTICS
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                component={Link} 
                to="/" 
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(179, 136, 255, 0.08)'
                  }
                }}
              >
                Dashboard
              </Button>
              <Button 
                component={Link} 
                to="/screener" 
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(179, 136, 255, 0.08)'
                  }
                }}
              >
                Screener
              </Button>
              <Button 
                component={Link} 
                to="/files" 
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(179, 136, 255, 0.08)'
                  }
                }}
              >
                Files
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<StockRatiosDashboard stockCode="AAPL" />} />
            <Route path="/screener" element={<StockScreener />} />
            <Route path="/files" element={<FileManagementDashboard />} />
            <Route path="/stock/:symbol" element={<StockRatiosDashboard />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;