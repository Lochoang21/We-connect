import { Search, Notifications, Message, KeyboardArrowDown, Person, Settings, Logout } from '@mui/icons-material';
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  IconButton,
  Avatar,
  Typography,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy user trực tiếp từ slice auth
  const { user } = useSelector((state) => state.auth);
  const fullName = user?.user_metadata?.full_name || 'User';
  // Lấy tối đa 2 chữ cái đầu để hiển thị trong Avatar (ví dụ: "Hoàng Bảo Lộc" => "H B" hoặc "HB")
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    console.log('Navigate to Profile');
    handleClose();
  };

  const handleSettings = () => {
    console.log('Navigate to Settings');
    handleClose();
  };

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
            id="user-menu-button"
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            startIcon={<Avatar sx={{ width: 32, height: 32 }}>{initials}</Avatar>}
            endIcon={<KeyboardArrowDown />}
            sx={{ textTransform: 'none', color: 'text.primary' }}
          >
            <Typography variant="body2" fontWeight="500">
              {fullName}
            </Typography>
          </Button>
          {/* Dropdown Menu */}
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'user-menu-button',
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            sx={{
              mt: 1,
              '& .MuiPaper-root': {
                minWidth: 200,
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }
            }}
          >
            {/* Menu Items */}
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleSettings} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout} sx={{ color: 'error' }}>
              <ListItemIcon>
                <Logout fontSize="small" sx={{ color: 'error' }} />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}