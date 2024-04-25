import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import moviesReducer from "./slices/moviesSlice";
import gptReducer from "./slices/gptSlice";
import configReducer from "./slices/configSlice";

export const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
