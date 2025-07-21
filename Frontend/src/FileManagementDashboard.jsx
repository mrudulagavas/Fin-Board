// src/FileManagementDashboard.js
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  TextField,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Avatar,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  CloudUpload,
  GetApp,
  Delete,
  Description,
  InsertDriveFile,
  Folder,
  Search,
  Star,
  Share
} from '@mui/icons-material';
import { indigo, deepPurple } from '@mui/material/colors';

const FileManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Mock data
  const recentFiles = [
    { id: 1, name: 'Q3 Earnings Analysis.xlsx', type: 'excel', date: '2023-11-15', size: '2.4 MB', starred: true },
    { id: 2, name: 'Valuation Model - AAPL.xlsx', type: 'excel', date: '2023-11-10', size: '1.8 MB', starred: false },
    { id: 3, name: 'Industry Report Q3.pdf', type: 'pdf', date: '2023-11-05', size: '4.2 MB', starred: true },
    { id: 4, name: 'Portfolio Holdings.csv', type: 'csv', date: '2023-10-28', size: '0.8 MB', starred: false },
    { id: 5, name: 'Market Research.pptx', type: 'ppt', date: '2023-10-20', size: '5.7 MB', starred: false },
  ];

  const sharedFiles = [
    { id: 6, name: 'Team Analysis - Tech Sector.xlsx', type: 'excel', date: '2023-11-12', size: '3.1 MB', sharedBy: 'Jane Doe' },
    { id: 7, name: 'Investment Thesis.docx', type: 'doc', date: '2023-11-08', size: '1.2 MB', sharedBy: 'John Smith' },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileUpload = () => {
    setUploading(true);
    setUploadSuccess(false);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadSuccess(true);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 300);
  };

  const handleFileDelete = (fileId) => {
    console.log(`Deleting file with ID: ${fileId}`);
  };

  const toggleStar = (fileId) => {
    console.log(`Toggling star for file with ID: ${fileId}`);
  };

  const getFileIcon = (type) => {
    const iconStyle = { fontSize: 32 };
    switch (type) {
      case 'excel':
        return <Description color="success" style={iconStyle} />;
      case 'pdf':
        return <Description color="error" style={iconStyle} />;
      case 'csv':
        return <InsertDriveFile color="action" style={iconStyle} />;
      case 'ppt':
        return <Description color="warning" style={iconStyle} />;
      case 'doc':
        return <Description color="info" style={iconStyle} />;
      default:
        return <InsertDriveFile style={iconStyle} />;
    }
  };

  const filteredFiles = recentFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Paper sx={{ 
        p: 3, 
        borderRadius: 3,
        background: 'linear-gradient(135deg, #1a2b4a 0%, #0e1a2e 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
          File Management
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <TextField
            variant="outlined"
            placeholder="Search files..."
            size="small"
            InputProps={{
              startAdornment: <Search color="action" sx={{ mr: 1 }} />,
              sx: { borderRadius: 2 }
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
          />
          
          <Box>
            <input
              accept=".xlsx,.xls,.csv,.pdf,.docx"
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                startIcon={<CloudUpload />}
                component="span"
                onClick={handleFileUpload}
                disabled={uploading}
                sx={{ 
                  background: 'linear-gradient(90deg, #7c4dff 0%, #b388ff 100%)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #7c4dff 0%, #b388ff 80%)',
                  },
                  borderRadius: 2
                }}
              >
                Upload File
              </Button>
            </label>
          </Box>
        </Box>
        
        {uploading && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CircularProgress variant="determinate" value={uploadProgress} sx={{ mr: 2 }} />
            <Typography variant="body2">
              Uploading... {uploadProgress}%
            </Typography>
          </Box>
        )}
        
        {uploadSuccess && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
            File uploaded successfully!
          </Alert>
        )}
        
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: indigo[500],
              height: 3,
            },
          }}
        >
          <Tab 
            label="My Files" 
            sx={{ fontSize: '0.875rem', fontWeight: 600 }}
          />
          <Tab 
            label="Shared With Me" 
            sx={{ fontSize: '0.875rem', fontWeight: 600 }}
          />
          <Tab 
            label="Templates" 
            sx={{ fontSize: '0.875rem', fontWeight: 600 }}
          />
        </Tabs>
        
        {activeTab === 0 && (
          <List sx={{ mt: 2 }}>
            {filteredFiles.map((file) => (
              <React.Fragment key={file.id}>
                <ListItem sx={{ 
                  borderRadius: 2,
                  '&:hover': { 
                    backgroundColor: 'rgba(179, 136, 255, 0.04)' 
                  }
                }}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(179, 136, 255, 0.08)', 
                    mr: 2,
                    color: 'text.primary'
                  }}>
                    {getFileIcon(file.type)}
                  </Avatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 500 }}>
                          {file.name}
                        </Typography>
                        {file.starred && (
                          <Star color="warning" sx={{ ml: 1, fontSize: 16 }} />
                        )}
                      </Box>
                    }
                    secondary={`Uploaded: ${file.date} • Size: ${file.size}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      aria-label="star"
                      onClick={() => toggleStar(file.id)}
                      sx={{ mr: 1 }}
                    >
                      <Star color={file.starred ? 'warning' : 'action'} />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="download" 
                      sx={{ mr: 1 }}
                    >
                      <GetApp />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="share"
                      sx={{ mr: 1 }}
                    >
                      <Share />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="delete" 
                      onClick={() => handleFileDelete(file.id)}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider sx={{ my: 1 }} />
              </React.Fragment>
            ))}
          </List>
        )}
        
        {activeTab === 1 && (
          <List sx={{ mt: 2 }}>
            {sharedFiles.map((file) => (
              <React.Fragment key={file.id}>
                <ListItem sx={{ 
                  borderRadius: 2,
                  '&:hover': { 
                    backgroundColor: 'rgba(179, 136, 255, 0.04)' 
                  }
                }}>
                  <Avatar sx={{ 
                    bgcolor: 'rgba(179, 136, 255, 0.08)', 
                    mr: 2,
                    color: 'text.primary'
                  }}>
                    {getFileIcon(file.type)}
                  </Avatar>
                  <ListItemText
                    primary={file.name}
                    secondary={`Shared by ${file.sharedBy} on ${file.date} • Size: ${file.size}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="download" sx={{ mr: 1 }}>
                      <GetApp />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider sx={{ my: 1 }} />
              </React.Fragment>
            ))}
          </List>
        )}
        
        {activeTab === 2 && (
          <Box sx={{ 
            p: 4, 
            textAlign: 'center',
            backgroundColor: 'rgba(179, 136, 255, 0.08)',
            borderRadius: 3,
            mt: 2
          }}>
            <Folder sx={{ 
              fontSize: 60, 
              mb: 2,
              color: deepPurple[500]
            }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Financial Model Templates
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Download our pre-built financial model templates for various industries
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="contained" 
                startIcon={<GetApp />}
                sx={{ 
                  background: 'linear-gradient(90deg, #7c4dff 0%, #b388ff 100%)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #7c4dff 0%, #b388ff 80%)',
                  },
                  borderRadius: 2
                }}
              >
                DCF Template
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<GetApp />} 
                sx={{ borderRadius: 2 }}
              >
                Comparable Analysis
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default FileManagementDashboard;