import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    categories: {
      nowPlayingMovies: null,
      popularMovies: null,
      topRatedMovies: null,
      trendingMovies: null,
    },
    trailerKeys: {
      nowPlaying: null,
      popular: null,
      topRated: null,
      trending: null,
    },
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.categories.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.categories.popularMovies = action.payload;
    },
    addTopRatedMovises: (state, action) => {
      state.categories.topRatedMovies = action.payload;
    },
    addTrendingMovies: (state, action) => {
      state.categories.trendingMovies = action.payload;
    },
    addNowPlayingTrailerKeys: (state, action) => {
      state.trailerKeys.nowPlaying = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovises,
  addTrendingMovies,
  addNowPlayingTrailerKeys,
} = moviesSlice.actions;

export default moviesSlice.reducer;
