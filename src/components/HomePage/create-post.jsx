import { ImageOutlined, AttachFile, RadioButtonChecked, Tag, AlternateEmail, EmojiEmotions } from '@mui/icons-material';
import { Avatar, Box, TextField, IconButton, Button, Paper } from '@mui/material';

export function CreatePost() {
  return (
    <Paper sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
        <Avatar sx={{ width: 40, height: 40 }}>JB</Avatar>
        <TextField
          fullWidth
          placeholder="What's on your mind?"
          variant="outlined"
          size="small"
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

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<ImageOutlined sx={{ color: 'success.main' }} />}
            size="small"
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
        <Button variant="contained" size="small">
          Share Post
        </Button>
      </Box>
    </Paper>
  );
}