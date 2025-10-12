import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Button, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, clearPosts } from '@/redux/slices/postSlice';
import { StoryCircles } from './story-circle';
import { CreatePost } from './create-post';
import { PostCard } from './post-card';
import { Refresh } from '@mui/icons-material';

export default function MainFeed() {
  const dispatch = useDispatch();
  const { posts, loading, error, hasMore, page } = useSelector((state) => state.posts);
  const [refreshing, setRefreshing] = useState(false);

  // Initial load
  useEffect(() => {
    dispatch(fetchPosts({ page: 0, limit: 10 }));
  }, [dispatch]);

  // useEffect(() => {
  //   // Subscribe to new posts
  //   const subscription = postService.subscribeToPostChanges((payload) => {
  //     if (payload.eventType === 'INSERT') {
  //       dispatch(addPost(payload.new));
  //     }
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [dispatch]);

  // Load more posts
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      dispatch(fetchPosts({ page: page + 1, limit: 10 }));
    }
  };

  // Refresh posts
  const handleRefresh = async () => {
    setRefreshing(true);
    dispatch(clearPosts());
    await dispatch(fetchPosts({ page: 0, limit: 10 }));
    setRefreshing(false);
  };

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

      {/* Refresh Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          startIcon={<Refresh />}
          onClick={handleRefresh}
          disabled={refreshing}
          size="small"
          sx={{ textTransform: 'none' }}
        >
          {refreshing ? 'Refreshing...' : 'Refresh Feed'}
        </Button>
      </Box>

      {/* Error State */}
      {error && (
        <Alert severity="error" onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      )}

      {/* Loading State - Initial */}
      {loading && posts.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Posts List */}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {/* Empty State */}
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

      {/* Load More Button */}
      {hasMore && posts.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            disabled={loading}
            sx={{ textTransform: 'none' }}
          >
            {loading ? (
              <>
                <CircularProgress size={16} sx={{ mr: 1 }} />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </Box>
      )}

      {/* End of Posts */}
      {!hasMore && posts.length > 0 && (
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="body2" color="text.secondary">
            You've reached the end
          </Typography>
        </Box>
      )}
    </Box>
  );
}