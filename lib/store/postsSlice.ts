import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/types';

interface PostsState {
  posts: Post[];
  status: 'start' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: 'start',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data.slice(0, 11).map((post: Post) => ({ ...post, selected: false }));
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (post: Omit<Post, 'id'>, { getState }) => {
    const state = getState() as { posts: PostsState };
    const currentPosts = state.posts.posts;

    const maxId =
      currentPosts.length > 0 ? Math.max(...currentPosts.map((p) => p.id)) : 0;

    const newPost = { ...post, id: maxId + 1 };

    /*
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    return { ...data, selected: false };
    */

    return { ...newPost, selected: false };
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    togglePostSelection: (state, action: PayloadAction<number>) => {
      const post = state.posts.find((post) => post.id === action.payload);
      if (post) {
        post.selected = !post.selected;
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export const { togglePostSelection, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
