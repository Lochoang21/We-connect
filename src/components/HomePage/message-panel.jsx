import { Search, Edit, FilterList, MoreVert } from '@mui/icons-material';
import { Avatar, Box, IconButton, Paper, TextField, Tabs, Tab, Typography, Badge } from '@mui/material';
import { useState } from 'react';

export function MessagesPanel() {
  const [tabValue, setTabValue] = useState(0);

  const contacts = [
    { name: "Roger Korsgaard", online: true },
    { name: "Terry Torff", online: true },
    { name: "Angel Bergson", online: false },
    { name: "Emerson Gouse", online: false },
    { name: "Corey Baptista", online: false },
    { name: "Zain Culhane", online: false },
    { name: "Randy Lipshutz", online: false },
    { name: "Craig Botosh", online: false },
  ];

  return (
    <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="600">Messages</Typography>
        <IconButton size="small">
          <Edit fontSize="small" />
        </IconButton>
      </Box>

      {/* Search */}
      <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          placeholder="Search"
          size="small"
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            endAdornment: (
              <IconButton size="small">
                <FilterList fontSize="small" />
              </IconButton>
            ),
            sx: {
              backgroundColor: 'action.hover',
              '& fieldset': { border: 'none' }
            }
          }}
        />
      </Box>

      {/* Tabs */}
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Primary" sx={{ textTransform: 'none' }} />
        <Tab label="General" sx={{ textTransform: 'none' }} />
        <Tab 
          label={
            <Badge badgeContent={3} color="primary">
              Requests
            </Badge>
          } 
          sx={{ textTransform: 'none' }} 
        />
      </Tabs>

      {/* Contacts List */}
      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
        {contacts.map((contact, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'action.hover' },
              transition: 'background-color 0.2s'
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Avatar sx={{ width: 40, height: 40 }}>
                {contact.name[0]}
              </Avatar>
              {contact.online && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    backgroundColor: 'success.main',
                    borderRadius: '50%',
                    border: 2,
                    borderColor: 'background.paper'
                  }}
                />
              )}
            </Box>
            <Typography variant="body2" sx={{ flex: 1 }}>{contact.name}</Typography>
            <IconButton size="small">
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>

      {/* View All */}
      <Box sx={{ p: 1.5, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
          View All
        </Typography>
      </Box>
    </Paper>
  );
}