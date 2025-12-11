import { useEffect, useRef, useCallback, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { StoryCircles } from './story-circle';
import { CreatePost } from './create-post';
import { PostCard } from './post-card';

export function MainFeedInfiniteScroll() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observerTarget = useRef(null);

  // Mock fetch posts function
  const fetchMockPosts = useCallback((currentPage) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newPosts = Array.from({ length: 10 }, (_, i) => ({
        _id: `post-${currentPage}-${i}`,
        content: `Sample post ${currentPage * 10 + i + 1}`,
        image: i % 3 === 0 ? 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500' : null,
        author: `user-${i}`,
        likes: [],
        comments: [],
        created_at: new Date().toISOString(),
        profiles: {
          id: `user-${i}`,
          full_name: `User ${i}`,
          avatar_url: null
        }
      }));

      setPosts(prev => [...prev, ...newPosts]);
      setLoading(false);

      // Simulate end of data after 5 pages
      if (currentPage >= 4) {
        setHasMore(false);
      }
    }, 1000);
  }, []);

  // Initial load
  useEffect(() => {
    if (posts.length === 0) {
      fetchMockPosts(0);
    }
  }, [posts.length, fetchMockPosts]);

  // Infinite scroll observer
  const handleObserver = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMockPosts(nextPage);
    }
  }, [hasMore, loading, page, fetchMockPosts]);

  useEffect(() => {
    const element = observerTarget.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

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
        <PostCard key={post._id} post={post} />
      ))}

      {/* Loading indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {/* Intersection observer target */}
      <div ref={observerTarget} style={{ height: '20px' }} />

      {/* End message */}
      {!hasMore && posts.length > 0 && (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body2" color="text.secondary">
            You've reached the end
          </Typography>
        </Box>
      )}

      {/* Empty state */}
      {!loading && posts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No posts yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Be the first to share something!
          </Typography>
        </Box>
      )}
    </Box>
  );
}