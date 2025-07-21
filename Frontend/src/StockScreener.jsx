// src/StockScreener.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  LinearProgress,
  Avatar
} from '@mui/material';
import { 
  Search, 
  FilterAlt, 
  Download,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';
import { indigo } from '@mui/material/colors';

const StockScreener = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    marketCap: '',
    sector: '',
    peRatio: '',
    dividendYield: ''
  });
  const [loading, setLoading] = useState(false);

  // Mock data
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', marketCap: 2500, peRatio: 28.5, dividendYield: 0.6, price: 175.32, change: 1.2 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', marketCap: 2200, peRatio: 32.1, dividendYield: 0.8, price: 310.45, change: -0.5 },
    { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', marketCap: 450, peRatio: 18.2, dividendYield: 2.5, price: 165.78, change: 0.8 },
    { symbol: 'PG', name: 'Procter & Gamble', sector: 'Consumer Goods', marketCap: 380, peRatio: 25.7, dividendYield: 2.3, price: 145.67, change: -1.1 },
    { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Financial', marketCap: 420, peRatio: 12.4, dividendYield: 2.8, price: 156.89, change: 2.3 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer', marketCap: 1600, peRatio: 60.3, dividendYield: 0.0, price: 3200.45, change: 3.2 },
    { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive', marketCap: 800, peRatio: 95.2, dividendYield: 0.0, price: 750.32, change: -2.7 },
    { symbol: 'V', name: 'Visa Inc.', sector: 'Financial', marketCap: 500, peRatio: 35.6, dividendYield: 0.7, price: 230.45, change: 1.5 },
    { symbol: 'WMT', name: 'Walmart Inc.', sector: 'Retail', marketCap: 400, peRatio: 22.1, dividendYield: 1.5, price: 145.67, change: 0.3 },
    { symbol: 'KO', name: 'Coca-Cola Co.', sector: 'Beverages', marketCap: 250, peRatio: 28.9, dividendYield: 3.0, price: 60.45, change: -0.8 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const resetFilters = () => {
    setFilters({
      marketCap: '',
      sector: '',
      peRatio: '',
      dividendYield: ''
    });
    setPage(0);
  };

  const getChangeColor = (change) => {
    return change >= 0 ? 'success.main' : 'error.main';
  };

  const getChangeIcon = (change) => {
    return change >= 0 ? 
      <TrendingUp fontSize="small" /> : 
      <TrendingDown fontSize="small" />;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Paper sx={{ 
        p: 3, 
        borderRadius: 3,
        background: 'linear-gradient(135deg, #1a2b4a 0%, #0e1a2e 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
          Stock Screener
        </Typography>
        
        <Box sx={{ 
          mb: 3, 
          p: 3, 
          backgroundColor: 'rgba(179, 136, 255, 0.08)', 
          borderRadius: 2 
        }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Market Cap</InputLabel>
                <Select
                  value={filters.marketCap}
                  onChange={(e) => handleFilterChange('marketCap', e.target.value)}
                  label="Market Cap"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="large">Large Cap ($10B)</MenuItem>
                  <MenuItem value="mid">Mid Cap ($2B-$10B)</MenuItem>
                  <MenuItem value="small">Small Cap ($2B)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sector</InputLabel>
                <Select
                  value={filters.sector}
                  onChange={(e) => handleFilterChange('sector', e.target.value)}
                  label="Sector"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                  <MenuItem value="Financial">Financial</MenuItem>
                  <MenuItem value="Consumer">Consumer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                label="P/E Max"
                type="number"
                value={filters.peRatio}
                onChange={(e) => handleFilterChange('peRatio', e.target.value)}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                label="Div Yield Min"
                type="number"
                value={filters.dividendYield}
                onChange={(e) => handleFilterChange('dividendYield', e.target.value)}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={2} sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<Search />}
                onClick={applyFilters}
                fullWidth
                sx={{ 
                  background: 'linear-gradient(90deg, #7c4dff 0%, #b388ff 100%)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #7c4dff 0%, #b388ff 80%)',
                  }
                }}
              >
                Apply
              </Button>
              <Button
                variant="outlined"
                startIcon={<FilterAlt />}
                onClick={resetFilters}
                fullWidth
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
        
        {loading && <LinearProgress sx={{ mb: 2 }} />}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Showing {stocks.length} stocks
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<Download />}
            sx={{ borderRadius: 2 }}
          >
            Export Results
          </Button>
        </Box>
        
        <TableContainer component={Paper} sx={{ 
          borderRadius: 2,
          background: 'rgba(0, 30, 60, 0.5)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
        }}>
          <Table>
            <TableHead sx={{ 
              '& th': { 
                fontWeight: 600,
                backgroundColor: 'rgba(179, 136, 255, 0.08)',
              }
            }}>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Sector</TableCell>
                <TableCell align="right">Market Cap</TableCell>
                <TableCell align="right">P/E Ratio</TableCell>
                <TableCell align="right">Div Yield</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Change</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((stock) => (
                  <TableRow 
                    key={stock.symbol}
                    hover
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: 'rgba(179, 136, 255, 0.04)' 
                      }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ 
                          bgcolor: indigo[500], 
                          width: 32, 
                          height: 32,
                          mr: 1
                        }}>
                          {stock.symbol.charAt(0)}
                        </Avatar>
                        <Typography sx={{ fontWeight: 600 }}>
                          {stock.symbol}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={stock.sector} 
                        size="small" 
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      ${(stock.marketCap / 1000).toFixed(1)}T
                    </TableCell>
                    <TableCell align="right">{stock.peRatio}</TableCell>
                    <TableCell align="right">
                      {stock.dividendYield > 0 ? `${stock.dividendYield}%` : '-'}
                    </TableCell>
                    <TableCell align="right">
                      ${stock.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-end',
                        color: getChangeColor(stock.change)
                      }}>
                        {getChangeIcon(stock.change)}
                        <Typography sx={{ ml: 0.5 }}>
                          {stock.change}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        component={Link}
                        to={`/stock/${stock.symbol}`}
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                      >
                        Analyze
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={stocks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: 'text.primary' }}
        />
      </Paper>
    </Box>
  );
};

export default StockScreener;