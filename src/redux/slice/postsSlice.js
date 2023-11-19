import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import postsApi from "../../utils/api";

const initialState = {
  posts: [],
  loading: false,
  error: "",
};

export const getPosts = createAsyncThunk(
  "posts/get",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.get(postsApi);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.status);
    }
  }
);

export const searchPost = createAsyncThunk(
  "post/get",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.get(`${postsApi}/${payload}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.status);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.payload;
    });
    //search post
    builder.addCase(searchPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(searchPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = [action.payload];
    });
    builder.addCase(searchPost.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.payload;
    });
  },
});

const postReducer = postSlice.reducer;

export default postReducer;
