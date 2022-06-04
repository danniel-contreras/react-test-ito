import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./authSlice";
import { Store } from "redux";
import { MoviesSlice } from "./moviesSlice";

const store: Store = configureStore({
  reducer: { auth: AuthSlice.reducer, movies: MoviesSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
