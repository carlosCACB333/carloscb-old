import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../../graphql/generated/graphql';

interface PostState {
  posts: Post[];
  postsInit: Post[];
}

const initialState: PostState = {
  posts: [],
  postsInit: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setPostsInit: (state, action: PayloadAction<Post[]>) => {
      state.postsInit = action.payload;
    },

    resetPosts: (state) => {
      state.posts = state.postsInit;
    },
  },
});

export const { setPosts, setPostsInit, resetPosts } = postSlice.actions;
