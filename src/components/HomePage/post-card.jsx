import { 
  Favorite, 
  FavoriteBorder, 
  ChatBubbleOutline, 
  Share, 
  MoreVert, 
  BookmarkBorder,
  Delete,
  Edit
} from '@mui/icons-material';
import { 
  Avatar, 
  Box, 
  IconButton, 
  Paper, 
  Typography, 
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

export function PostCard({ post }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  
  // Mock current user
  const mockCurrentUserId = 'user-1';
  
  const likesCount = post.likes?.length || 0;
  const commentsCount = post.comments?.length || 0;

  const formatTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  const authorName = post.profiles?.full_name || 'Anonymous';
  const authorAvatar = post.profiles?.avatar_url;
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    console.log('Like toggled');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      console.log('Delete post:', post._id);
      handleCloseMenu();
    }
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const isAuthor = mockCurrentUserId === post.author;

  return (
    <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar 
            src={authorAvatar}
            sx={{ width: 40, height: 40 }}
          >
            {authorName[0]?.toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="600">
              {authorName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatTime(post.created_at)}
            </Typography>
          </Box>
        </Box>
        
        {isAuthor && (
          <>
            <IconButton size="small" onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleCloseMenu}>
                <Edit fontSize="small" sx={{ mr: 1 }} />
                Edit
              </MenuItem>
              <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                <Delete fontSize="small" sx={{ mr: 1 }} />
                Delete
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>

      {post.content && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            {post.content}
          </Typography>
        </Box>
      )}

      {post.image && (
        <Box
          component="img"
          src={post.image}
          alt="Post content"
          sx={{
            width: '100%',
            maxHeight: 500,
            objectFit: 'cover',
            display: 'block'
          }}
        />
      )}

      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
              size="small"
              onClick={handleLike}
              sx={{ 
                textTransform: 'none', 
                color: isLiked ? 'error.main' : 'text.secondary',
                fontWeight: isLiked ? 600 : 400
              }}
            >
              {likesCount + (isLiked ? 1 : 0)} {likesCount === 1 ? 'Like' : 'Likes'}
            </Button>
            <Button
              startIcon={<ChatBubbleOutline />}
              size="small"
              sx={{ textTransform: 'none', color: 'text.secondary' }}
            >
              {commentsCount} {commentsCount === 1 ? 'Comment' : 'Comments'}
            </Button>
            <Button
              startIcon={<Share />}
              size="small"
              sx={{ textTransform: 'none', color: 'text.secondary' }}
            >
              Share
            </Button>
          </Box>
          <IconButton size="small">
            <BookmarkBorder />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
