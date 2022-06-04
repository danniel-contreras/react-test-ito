import { ThunkAction, AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Result } from "postcss";
import { GetPopularMovies, GetSearchMovies } from "../../api/movies.api";
import { IMovie, IMovies, IUser } from "../../interfaces/redux.interface";
import { MoviesSlice } from "../moviesSlice";
import { RootState } from "../store";
import { values } from "../values";

export const moviesActions = MoviesSlice.actions;

const noData = {
  page: 0,
  results: [values],
  total_pages: 0,
  total_results: 0,
  error: "",
};

export const setMovies = (
  page: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    await GetPopularMovies(page)
      .then(({ data }) => {
        dispatch(moviesActions.setMovies(data));
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          dispatch(
            moviesActions.setMovies({
              ...noData,
              error: "No records founds",
            })
          );
          return;
        }
        dispatch(
          moviesActions.setMovies({
            ...noData,
            error: "An unexpected error has ocurred",
          })
        );
      });
  };
};

export const searchMovies = (
  page: number,
  query: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    await GetSearchMovies(page, query)
      .then(({ data }) => {
        console.log(data)
        dispatch(moviesActions.setMovies(data));
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          dispatch(
            moviesActions.setMovies({
              ...noData,
              error: "No records founds",
            })
          );
          return;
        }
        dispatch(
          moviesActions.setMovies({
            ...noData,
            error: "An unexpected error has ocurred",
          })
        );
      });
  };
};
