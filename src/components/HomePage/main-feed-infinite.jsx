import { useEffect, useRef, useCallback } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '@/redux/slices/postSlice';
import { StoryCircles } from './story-circle';
import { CreatePost } from './create-post';
import { PostCard } from './post-card';
import { postService } from '@/services/post.service';
import { addPost } from '@/redux/slices/postSlice';

export function MainFeedInfiniteScroll() {
  const dispatch = useDispatch();
  const { posts, loading, hasMore, page } = useSelector((state) => state.posts);
  const observerTarget = useRef(null);

  // Initial load
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts({ page: 0, limit: 10 }));
    }
  }, [dispatch, posts.length]);

  // Infinite scroll observer
  const handleObserver = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !loading) {
      dispatch(fetchPosts({ page: page + 1, limit: 10 }));
    }
  }, [hasMore, loading, page, dispatch]);

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