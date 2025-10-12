import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postService } from '@/services/post.service';

// Async thunks
export const createPost = createAsyncThunk(
  'posts/create',
  async ({ content, imageFile, userId }, { rejectWithValue }) => {
    try {
      const data = await postService.createPost({ content, imageFile, userId });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async ({ page = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const data = await postService.getPosts(page, limit);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchByUser',
  async ({ userId, page = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const data = await postService.getPostsByUser(userId, page, limit);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ postId, content, imageFile, userId }, { rejectWithValue }) => {
    try {
      const data = await postService.updatePost(postId, { content, imageFile }, userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      await postService.deletePost(postId, userId);
      return postId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleLike = createAsyncThunk(
  'posts/toggleLike',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const data = await postService.toggleLike(postId, userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  totalCount: 0,
  hasMore: true,
  page: 0
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.page = 0;
      state.hasMore = true;
    },
    addPost: (state, action) => {
      const exists = state.posts.some(p => p._id === action.payload._id);
      if (!exists) {
        state.posts.unshift(action.payload);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.page === 0) {
          state.posts = action.payload.posts;
        } else {
          state.posts.push(...action.payload.posts);
        }
        state.totalCount = action.payload.totalCount;
        state.hasMore = action.payload.hasMore;
        state.page = action.meta.arg.page;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(p => p._id !== action.payload);
      })
      // Toggle Like
      .addCase(toggleLike.fulfilled, (state, action) => {
        const index = state.posts.findIndex(p => p._id === action.payload.post._id);
        if (index !== -1) {
          state.posts[index] = action.payload.post;
        }
      });
  },
});

export const { clearError, clearPosts, addPost } = postSlice.actions;
export default postSlice.reducer;