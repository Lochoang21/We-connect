import { useState, useRef } from 'react';
import { 
  ImageOutlined, 
  AttachFile, 
  RadioButtonChecked, 
  Tag, 
  AlternateEmail, 
  EmojiEmotions,
  Close 
} from '@mui/icons-material';
import { 
  Avatar, 
  Box, 
  TextField, 
  IconButton, 
  Button, 
  Paper,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '@/redux/slices/postSlice';
import { uploadService } from '@/services/upload.service';

export function CreatePost() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.posts);
  
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const fileInputRef = useRef(null);

  // Handle image selection
  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Validate image
      uploadService.validateImage(file);
      
      setSelectedImage(file);
      
      // Create preview
      const preview = await uploadService.createPreview(file);
      setImagePreview(preview);
    } catch (error) {
      setNotification({
        open: true,
        message: error.message,
        severity: 'error'
      });
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Create post
  const handleCreatePost = async () => {
    // Validate content
    if (!content.trim() && !selectedImage) {
      setNotification({
        open: true,
        message: 'Please add some content or an image',
        severity: 'warning'
      });
      return;
    }

    try {
      await dispatch(createPost({
        content: content.trim(),
        imageFile: selectedImage,
        userId: user?.id
      })).unwrap();

      // Success - reset form
      setContent('');
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setNotification({
        open: true,
        message: 'Post created successfully!',
        severity: 'success'
      });

    } catch (error) {
      console.error('Error creating post:', error);
      setNotification({
        open: true,
        message: error || 'Failed to create post',
        severity: 'error'
      });
    }
  };

  // Get user avatar or initials
  const getUserAvatar = () => {
    if (user?.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url;
    }
    const name = user?.user_metadata?.full_name || user?.email || 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          <Avatar 
            src={typeof getUserAvatar() === 'string' && getUserAvatar().length > 1 ? getUserAvatar() : undefined}
            sx={{ width: 40, height: 40 }}
          >
            {typeof getUserAvatar() === 'string' && getUserAvatar().length === 1 ? getUserAvatar() : null}
          </Avatar>
          <TextField
            fullWidth
            placeholder="What's on your mind?"
            variant="outlined"
            size="small"
            multiline
            maxRows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'action.hover',
                '& fieldset': { border: 'none' }
              }
            }}
          />
          <IconButton disabled={loading}>
            <EmojiEmotions />
          </IconButton>
        </Box>

        {/* Image Preview */}
        {imagePreview && (
          <Box sx={{ position: 'relative', mb: 2 }}>
            <Box
              component="img"
              src={imagePreview}
              alt="Preview"
              sx={{
                width: '100%',
                maxHeight: 400,
                objectFit: 'contain',
                borderRadius: 2,
                backgroundColor: 'action.hover'
              }}
            />
            <IconButton
              onClick={handleRemoveImage}
              disabled={loading}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
              }}
            >
              <Close />
            </IconButton>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageSelect}
              disabled={loading}
            />
            <Button
              startIcon={<ImageOutlined sx={{ color: 'success.main' }} />}
              size="small"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Image/Video
            </Button>
            <Button
              startIcon={<AttachFile sx={{ color: 'info.main' }} />}
              size="small"
              disabled={loading}
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Attachment
            </Button>
            <Button
              startIcon={<RadioButtonChecked sx={{ color: 'error.main' }} />}
              size="small"
              disabled={loading}
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Live
            </Button>
            <Button
              startIcon={<Tag sx={{ color: 'warning.main' }} />}
              size="small"
              disabled={loading}
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Hashtag
            </Button>
            <Button
              startIcon={<AlternateEmail sx={{ color: 'secondary.main' }} />}
              size="small"
              disabled={loading}
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Mention
            </Button>
          </Box>
          <Button 
            variant="contained" 
            size="small"
            onClick={handleCreatePost}
            disabled={loading || (!content.trim() && !selectedImage)}
            startIcon={loading && <CircularProgress size={16} color="inherit" />}
          >
            {loading ? 'Posting...' : 'Share Post'}
          </Button>
        </Box>
      </Paper>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNotification({ ...notification, open: false })} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}
