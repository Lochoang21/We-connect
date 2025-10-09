import { Favorite, FavoriteBorder, ChatBubbleOutline, Share, MoreVert, BookmarkBorder } from '@mui/icons-material';
import { Avatar, Box, IconButton, Paper, Typography, Button } from '@mui/material';
import { useState } from 'react';

export function PostCard({ post }) {
  const [liked, setLiked] = useState(false);

  return (
    <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {/* Post Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 40, height: 40 }}>
            {post.author.name[0]}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight="600">
              {post.author.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.author.time}
            </Typography>
          </Box>
        </Box>
        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </Box>

      {/* Post Images */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: post.images.length > 1 ? 'repeat(2, 1fr)' : '1fr',
          gap: 0.125
        }}
      >
        {post.images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image || '/placeholder.svg'}
            alt={`Post image ${index + 1}`}
            sx={{
              width: '100%',
              height: 280,
              objectFit: 'cover',
              display: 'block'
            }}
          />
        ))}
      </Box>

      {/* Post Actions */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={liked ? <Favorite color="error" /> : <FavoriteBorder />}
              size="small"
              onClick={() => setLiked(!liked)}
              sx={{ textTransform: 'none', color: 'text.secondary' }}
            >
              {post.likes} Like
            </Button>
            <Button
              startIcon={<ChatBubbleOutline />}
              size="small"
              sx={{ textTransform: 'none', color: 'text.secondary' }}
            >
              {post.comments} Comment
            </Button>
            <Button
              startIcon={<Share />}
              size="small"
              sx={{ textTransform: 'none', color: 'text.secondary' }}
            >
              {post.shares} Share
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