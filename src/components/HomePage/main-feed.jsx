import { Box } from '@mui/material';
import { StoryCircles } from './story-circle';
import { CreatePost } from './create-post';
import { PostCard } from './post-card';

export default function MainFeed() {
  const posts = [
    {
      id: 1,
      author: {
        name: "Cameron Williamson",
        avatar: "/placeholder.svg?height=40&width=40",
        time: "14 Aug at 4:41 PM",
      },
      images: ["/purple-3d-headphones.jpg", "/blue-3d-abstract-shapes.jpg"],
      likes: 30,
      comments: 12,
      shares: 2,
    },
    {
      id: 2,
      author: {
        name: "Terry Lipshutz",
        avatar: "/placeholder.svg?height=40&width=40",
        time: "14 Aug at 4:21 PM",
      },
      images: ["/gradient-waves-abstract.jpg"],
      likes: 45,
      comments: 8,
      shares: 5,
    },
    {
      id: 3,
      author: {
        name: "David Bao Loc",
        avatar: "/placeholder.svg?height=40&width=40",
        time: "14 Aug at 4:41 PM",
      },
      images: ["/purple-3d-headphones.jpg", "/blue-3d-abstract-shapes.jpg"],
      likes: 30,
      comments: 12,
      shares: 2,
    },
    {
      id: 4,
      author: {
        name: "Mathew Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        time: "14 Aug at 4:21 PM",
      },
      images: ["/gradient-waves-abstract.jpg"],
      likes: 45,
      comments: 8,
      shares: 5,
    },
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
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  );
}