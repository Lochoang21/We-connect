// src/services/post.service.js
import { supabase } from '@/libs/supabaseClient';
import { uploadService } from './upload.service';

class PostService {
  /**
   * Get posts with pagination
   */
  async getPosts(page = 0, limit = 10) {
    try {
      const from = page * limit;
      const to = from + limit - 1;

      // Query posts và JOIN với profiles thông qua author
      const { data, error, count } = await supabase
        .from('posts')
        .select(`
          _id,
          content,
          image,
          image_public_id,
          author,
          likes,
          comments,
          created_at,
          updated_at,
          profiles!posts_author_fkey (
            id,
            full_name,
            avatar_url,
            bio
          )
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return {
        posts: data || [],
        totalCount: count || 0,
        hasMore: to < (count || 0) - 1
      };
    } catch (error) {
      console.error('Get posts error:', error);
      throw error;
    }
  }

  /**
   * Create new post
   */
  async createPost({ content, imageFile, userId }) {
    try {
      if (!userId) {
        throw new Error('User must be authenticated');
      }

      let imageUrl = null;
      let imagePublicId = null;

      if (imageFile) {
        const uploadResult = await uploadService.uploadImage(imageFile, 'posts');
        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.publicId;
      }

      const { data, error } = await supabase
        .from('posts')
        .insert([{
          content: content?.trim() || '',
          image: imageUrl,
          image_public_id: imagePublicId,
          author: userId
        }])
        .select(`
          _id,
          content,
          image,
          image_public_id,
          author,
          likes,
          comments,
          created_at,
          updated_at,
          profiles!posts_author_fkey (
            id,
            full_name,
            avatar_url,
            bio
          )
        `)
        .single();

      if (error) {
        console.error('Create post error:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Create post error:', error);
      throw error;
    }
  }

  /**
   * Get single post by ID
   */
  async getPostById(postId) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          _id,
          content,
          image,
          image_public_id,
          author,
          likes,
          comments,
          created_at,
          updated_at,
          profiles!posts_author_fkey (
            id,
            full_name,
            avatar_url,
            bio
          )
        `)
        .eq('_id', postId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get post error:', error);
      throw error;
    }
  }

  /**
   * Get posts by user ID
   */
  async getPostsByUser(userId, page = 0, limit = 10) {
    try {
      const from = page * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from('posts')
        .select(`
          _id,
          content,
          image,
          image_public_id,
          author,
          likes,
          comments,
          created_at,
          updated_at,
          profiles!posts_author_fkey (
            id,
            full_name,
            avatar_url,
            bio
          )
        `, { count: 'exact' })
        .eq('author', userId)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        posts: data || [],
        totalCount: count || 0,
        hasMore: to < (count || 0) - 1
      };
    } catch (error) {
      console.error('Get user posts error:', error);
      throw error;
    }
  }

  /**
   * Update post
   */
  async updatePost(postId, { content, imageFile }, userId) {
    try {
      if (!userId) {
        throw new Error('User must be authenticated');
      }

      const updateData = {};

      if (content !== undefined) {
        updateData.content = content.trim();
      }

      if (imageFile) {
        const uploadResult = await uploadService.uploadImage(imageFile, 'posts');
        updateData.image = uploadResult.url;
        updateData.image_public_id = uploadResult.publicId;
      }

      const { data, error } = await supabase
        .from('posts')
        .update(updateData)
        .eq('_id', postId)
        .eq('author', userId) // Ensure user owns the post
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update post error:', error);
      throw error;
    }
  }

  /**
   * Delete post
   */
  async deletePost(postId, userId) {
    try {
      if (!userId) {
        throw new Error('User must be authenticated');
      }

      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('_id', postId)
        .eq('author', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete post error:', error);
      throw error;
    }
  }

  /**
   * Like/Unlike post
   */
  async toggleLike(postId, userId) {
    try {
      if (!userId) {
        throw new Error('User must be authenticated');
      }

      // Get current post
      const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('likes')
        .eq('_id', postId)
        .single();

      if (fetchError) throw fetchError;

      const likes = post.likes || [];
      const hasLiked = likes.includes(userId);

      let newLikes;
      if (hasLiked) {
        // Unlike
        newLikes = likes.filter(id => id !== userId);
      } else {
        // Like
        newLikes = [...likes, userId];
      }

      const { data, error } = await supabase
        .from('posts')
        .update({ likes: newLikes })
        .eq('_id', postId)
        .select()
        .single();

      if (error) throw error;

      return {
        post: data,
        isLiked: !hasLiked
      };
    } catch (error) {
      console.error('Toggle like error:', error);
      throw error;
    }
  }

  /**
   * Subscribe to post changes (real-time)
   */
  subscribeToPostChanges(callback) {
    return supabase
      .channel('posts-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        callback
      )
      .subscribe();
  }
}

export const postService = new PostService();