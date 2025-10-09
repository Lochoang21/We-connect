import { Search, Notifications, Message, KeyboardArrowDown } from '@mui/icons-material';
import { AppBar, Toolbar, Box, TextField, IconButton, Avatar, Typography, Button, InputAdornment } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Navbar() {

  // Lấy user trực tiếp từ slice auth
  const user = useSelector((state) => state.auth?.user || null);
  const fullName = user?.user_metadata?.full_name || 'User';
  // Lấy tối đa 2 chữ cái đầu để hiển thị trong Avatar (ví dụ: "Hoàng Bảo Lộc" => "H B" hoặc "HB")
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ top: 0, zIndex: 1100 }}>
      <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 1400, width: '100%', mx: 'auto', px: 3 }}>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img className='w-9 h-9' src="./weconnect-logo.png" alt="" />
          <Typography variant="h6" fontWeight="600">
            Connect
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ flex: 1, maxWidth: 500, mx: 4 }}>
          <TextField
            fullWidth
            placeholder="Search"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'action.hover',
                '& fieldset': { border: 'none' }
              }
            }}
          />
        </Box>

        {/* Right Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton>
            <Notifications />
          </IconButton>
          <IconButton>
            <Message />
          </IconButton>
          <Button
            startIcon={<Avatar sx={{ width: 32, height: 32 }}>{initials}</Avatar>}
            endIcon={<KeyboardArrowDown />}
            sx={{ textTransform: 'none', color: 'text.primary' }}
          >
            <Typography variant="body2" fontWeight="500">
              {fullName}
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}