import { Box, Typography } from '@mui/material';
import { StoryCircles } from './story-circle';
import { CreatePost } from './create-post';
import { PostCard } from './post-card';

export default function MainFeed() {
  // Mock posts data
  const mockPosts = [
    {
      _id: '1',
      content: 'This is a sample post! 🎉',
      image: null,
      author: 'user-1',
      likes: ['user-2', 'user-3'],
      comments: [],
      created_at: new Date().toISOString(),
      profiles: {
        id: 'user-1',
        full_name: 'Jane Smith',
        avatar_url: null
      }
    },
    {
      _id: '2',
      content: 'Beautiful day for coding! ☀️',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500',
      author: 'user-2',
      likes: ['user-1'],
      comments: [],
      created_at: new Date(Date.now() - 3600000).toISOString(),
      profiles: {
        id: 'user-2',
        full_name: 'Mike Johnson',
        avatar_url: null
      }
    }
  ];

  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        maxWidth: 680,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <StoryCircles />
      <CreatePost />

      {mockPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          End of feed
        </Typography>
      </Box>
    </Box>
  );
}