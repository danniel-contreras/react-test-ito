import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "postcss";
import { IMovies, MoviesState } from "../interfaces/redux.interface";
import { values } from "./values";

const initialState = {
  movies: {
    page: 0,
    results: [values],
    total_pages: 0,
    total_results: 0,
    error: "",
  },
};

export const MoviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<MoviesState>) {
      state.movies = action.payload;
    },
  },
});
