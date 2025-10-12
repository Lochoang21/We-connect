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
  MenuItem,
  CircularProgress
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, deletePost } from '@/redux/slices/postSlice';
import { formatDistanceToNow } from 'date-fns';

export function PostCard({ post }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  

  // Check if current user liked the post
  const isLiked = post.likes?.includes(user?.id);
  const likesCount = post.likes?.length || 0;
  const commentsCount = post.comments?.length || 0;

  // Format time
  const formatTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  // Get author info
  // const authorName = post.users?.user_metadata?.full_name || 
  //                    post.users?.email?.split('@')[0] || 
  //                    'Anonymous';
  // const authorAvatar = post.users?.user_metadata?.avatar_url;
   const authorName = post.profiles?.full_name || 'Anonymous';
  const authorAvatar = post.profiles?.avatar_url;
  const authorId = post.profiles?.id || post.author;
  // Handle like
  const handleLike = async () => {
    if (!user) return;
    
    try {
      await dispatch(toggleLike({ 
        postId: post._id, 
        userId: user.id 
      })).unwrap();
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!user || !window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setLoading(true);
    try {
      await dispatch(deletePost({ 
        postId: post._id, 
        userId: user.id 
      })).unwrap();
      handleCloseMenu();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  // Menu handlers
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Check if current user is the author
  const isAuthor = user?.id === post.author;


  return (
    <Paper sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Post Header */}
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

      {/* Post Content */}
      {post.content && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            {post.content}
          </Typography>
        </Box>
      )}

      {/* Post Image */}
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

      {/* Post Actions */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
              size="small"
              onClick={handleLike}
              disabled={!user}
              sx={{ 
                textTransform: 'none', 
                color: isLiked ? 'error.main' : 'text.secondary',
                fontWeight: isLiked ? 600 : 400
              }}
            >
              {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
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
