// src/StockRatiosDashboard.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Tabs,
  Tab,
  Avatar,
  LinearProgress,
  Chip
} from '@mui/material';
import { 
  Equalizer as EqualizerIcon,
  ShowChart as ShowChartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material';
import { indigo } from '@mui/material/colors'; 

const StockRatiosDashboard = ({ stockCode: propStockCode }) => {
  const { symbol } = useParams();
  const stockCode = symbol || propStockCode || 'AAPL';
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Mock data
  const balanceSheetData = [
    { metric: 'Current Ratio', value: 2.5, industryAvg: 1.8, trend: 'up' },
    { metric: 'Debt to Equity', value: 0.45, industryAvg: 0.60, trend: 'down' },
    { metric: 'Quick Ratio', value: 1.8, industryAvg: 1.2, trend: 'up' },
    { metric: 'Working Capital', value: 5.2, industryAvg: 3.1, unit: 'B', trend: 'up' },
  ];

  const incomeStatementData = [
    { metric: 'Gross Margin', value: 42, industryAvg: 38, unit: '%', trend: 'up' },
    { metric: 'Operating Margin', value: 28, industryAvg: 22, unit: '%', trend: 'up' },
    { metric: 'Net Profit Margin', value: 18, industryAvg: 15, unit: '%', trend: 'up' },
    { metric: 'EPS', value: 5.20, industryAvg: 3.80, trend: 'up' },
  ];

  const cashFlowData = [
    { metric: 'Operating Cash Flow', value: 8.5, industryAvg: 6.2, unit: 'B', trend: 'up' },
    { metric: 'Free Cash Flow', value: 6.1, industryAvg: 4.3, unit: 'B', trend: 'up' },
    { metric: 'Cash Flow Margin', value: 22, industryAvg: 18, unit: '%', trend: 'up' },
    { metric: 'CapEx Coverage', value: 3.5, industryAvg: 2.8, unit: 'x', trend: 'up' },
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <TrendingUpIcon color="success" fontSize="small" /> : 
      <TrendingDownIcon color="error" fontSize="small" />;
  };

  const formatValue = (value, unit = '') => {
    return `${value}${unit}`;
  };

  const calculateVariance = (value, avg) => {
    return ((value / avg) - 1) * 100;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Paper sx={{ 
        p: 3, 
        borderRadius: 3,
        background: 'linear-gradient(135deg, #1a2b4a 0%, #0e1a2e 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ 
            bgcolor: indigo[500], 
            width: 56, 
            height: 56,
            mr: 2
          }}>
            {stockCode.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {stockCode}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Apple Inc. - Technology Sector
            </Typography>
          </Box>
        </Box>

        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: indigo[500],
              height: 3,
            },
          }}
        >
          <Tab 
            label="Balance Sheet" 
            icon={<EqualizerIcon />} 
            iconPosition="start"
            sx={{ fontSize: '0.875rem', fontWeight: 600 }}
          />
          <Tab 
            label="Income Statement" 
            icon={<ShowChartIcon />} 
            iconPosition="start"
            sx={{ fontSize: '0.875rem', fontWeight: 600 }}
          />
          <Tab 
            label="Cash Flow" 
            icon={<EqualizerIcon />} 
            iconPosition="start"
            sx={{ fontSize: '0.875rem', fontWeight: 600 }}
          />
        </Tabs>
      </Paper>

      <Paper sx={{ 
        p: 3, 
        borderRadius: 3,
        background: 'linear-gradient(135deg, #1a2b4a 0%, #0e1a2e 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        {activeTab === 0 && (
          <RatioTable 
            data={balanceSheetData} 
            title="Balance Sheet Ratios" 
            formatValue={formatValue}
            calculateVariance={calculateVariance}
            getTrendIcon={getTrendIcon}
          />
        )}
        {activeTab === 1 && (
          <RatioTable 
            data={incomeStatementData} 
            title="Income Statement Ratios" 
            formatValue={formatValue}
            calculateVariance={calculateVariance}
            getTrendIcon={getTrendIcon}
          />
        )}
        {activeTab === 2 && (
          <RatioTable 
            data={cashFlowData} 
            title="Cash Flow Ratios" 
            formatValue={formatValue}
            calculateVariance={calculateVariance}
            getTrendIcon={getTrendIcon}
          />
        )}
      </Paper>
    </Box>
  );
};

const RatioTable = ({ data, title, formatValue, calculateVariance, getTrendIcon }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {title}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ 
              '& th': { 
                fontWeight: 600,
                backgroundColor: 'rgba(179, 136, 255, 0.08)',
              }
            }}>
              <TableCell>Metric</TableCell>
              <TableCell align="right">Company Value</TableCell>
              <TableCell align="right">Industry Avg</TableCell>
              <TableCell align="right">Variance</TableCell>
              <TableCell align="right">Trend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              const variance = calculateVariance(row.value, row.industryAvg);
              const isPositive = variance >= 0;
              
              return (
                <TableRow 
                  key={row.metric}
                  hover
                  sx={{ 
                    '&:last-child td': { borderBottom: 0 },
                    '&:hover': { backgroundColor: 'rgba(179, 136, 255, 0.04)' }
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{row.metric}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {formatValue(row.value, row.unit)}
                  </TableCell>
                  <TableCell align="right">
                    {formatValue(row.industryAvg, row.unit)}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={`${isPositive ? '+' : ''}${variance.toFixed(1)}%`}
                      size="small"
                      color={isPositive ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {getTrendIcon(row.trend)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StockRatiosDashboard;