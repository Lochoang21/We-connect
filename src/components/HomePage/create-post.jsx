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
  Snackbar,
  Alert
} from '@mui/material';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const fileInputRef = useRef(null);

  // Mock user
  const mockUser = {
    user_metadata: {
      full_name: 'John Doe',
      avatar_url: null
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setNotification({
        open: true,
        message: 'Please select a valid image file',
        severity: 'error'
      });
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreatePost = () => {
    if (!content.trim() && !selectedImage) {
      setNotification({
        open: true,
        message: 'Please add some content or an image',
        severity: 'warning'
      });
      return;
    }

    // Mock post creation
    console.log('Creating post with:', { content, image: selectedImage?.name });
    
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
  };

  const getUserAvatar = () => {
    const name = mockUser?.user_metadata?.full_name || 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          <Avatar sx={{ width: 40, height: 40 }}>
            {getUserAvatar()}
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
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'action.hover',
                '& fieldset': { border: 'none' }
              }
            }}
          />
          <IconButton>
            <EmojiEmotions />
          </IconButton>
        </Box>

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
            />
            <Button
              startIcon={<ImageOutlined sx={{ color: 'success.main' }} />}
              size="small"
              onClick={() => fileInputRef.current?.click()}
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Image/Video
            </Button>
            <Button
              startIcon={<AttachFile sx={{ color: 'info.main' }} />}
              size="small"
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Attachment
            </Button>
            <Button
              startIcon={<RadioButtonChecked sx={{ color: 'error.main' }} />}
              size="small"
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Live
            </Button>
            <Button
              startIcon={<Tag sx={{ color: 'warning.main' }} />}
              size="small"
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Hashtag
            </Button>
            <Button
              startIcon={<AlternateEmail sx={{ color: 'secondary.main' }} />}
              size="small"
              sx={{ color: 'text.secondary', textTransform: 'none' }}
            >
              Mention
            </Button>
          </Box>
          <Button 
            variant="contained" 
            size="small"
            onClick={handleCreatePost}
            disabled={!content.trim() && !selectedImage}
          >
            Share Post
          </Button>
        </Box>
      </Paper>

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
