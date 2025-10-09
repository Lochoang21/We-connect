import { Home, People, CalendarMonth, VideoLibrary, Photo, ShoppingBag, Description } from '@mui/icons-material';
import { Avatar, Box, Button, Paper, Typography, Badge, Divider, Link } from '@mui/material';
import { useSelector } from 'react-redux';


export default function LeftSidebar() {

  const user = useSelector((state) => state.auth?.user || null);
  const fullName = user?.user_metadata?.full_name || 'User';
  const email = user?.email || 'david@gmail.com';

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  const navItems = [
    { icon: Home, label: "Feed", active: true, badge: null },
    { icon: People, label: "Friends", active: false, badge: null },
    { icon: VideoLibrary, label: "Watch Videos", active: false, badge: null },
    { icon: Photo, label: "Photos", active: false, badge: null },
    { icon: ShoppingBag, label: "Marketplace", active: false, badge: null },
  ];

  const pages = [
    { name: "UI/UX Community...", color: "#3b82f6" },
    { name: "Web Designer", color: "#ec4899" },
    { name: "Dribbble Community", color: "#f472b6" },
    { name: "Behance ®", color: "#2563eb" },
  ];

  return (
    <Box
      component="aside"
      sx={{
        width: 280,
        position: 'sticky',
        top: 73,
        height: 'calc(100vh - 73px)',
        overflowY: 'auto',
        p: 2,
        borderRight: 1,
        borderColor: 'divider'
      }}
    >
      {/* User Profile Card */}
      <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar sx={{ width: 48, height: 48 }}>{initials}</Avatar>
          <Box>
            <Typography variant="body2" fontWeight="600">{fullName}</Typography>
            <Typography variant="caption" color="text.secondary"
              sx={{
                display: 'inline-block',
                maxWidth: 150, // hoặc px tùy ý
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                verticalAlign: 'middle'
              }}
            >{email}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
          <Box>
            <Typography variant="body2" fontWeight="600">120</Typography>
            <Typography variant="caption" color="text.secondary">Follower</Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="600">80</Typography>
            <Typography variant="caption" color="text.secondary">Following</Typography>
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="600">90</Typography>
            <Typography variant="caption" color="text.secondary">Post</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Navigation Menu */}
      <Box sx={{ mb: 3 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.label}
              variant={item.active ? "contained" : "text"}
              fullWidth
              startIcon={<Icon />}
              sx={{
                justifyContent: 'flex-start',
                gap: 1.5,
                mb: 0.5,
                textTransform: 'none',
                color: item.active ? 'white' : 'text.primary'
              }}
            >
              <Box sx={{ flex: 1, textAlign: 'left' }}>{item.label}</Box>
              {item.badge && (
                <Badge badgeContent={item.badge} color="error" />
              )}
            </Button>
          );
        })}
      </Box>

      {/* Pages You Like */}
      {/* <Box>
        <Typography variant="caption" fontWeight="600" color="text.secondary" sx={{ textTransform: 'uppercase', mb: 1.5, display: 'block' }}>
          Pages You Like
        </Typography>
        <Box>
          {pages.map((page) => (
            <Button
              key={page.name}
              variant="text"
              fullWidth
              startIcon={
                <Box sx={{ width: 32, height: 32, backgroundColor: page.color, borderRadius: 1 }} />
              }
              sx={{
                justifyContent: 'flex-start',
                gap: 1.5,
                mb: 0.5,
                textTransform: 'none',
                color: 'text.primary'
              }}
            >
              {page.name}
            </Button>
          ))}
        </Box>
      </Box> */}
    </Box>
  );
}