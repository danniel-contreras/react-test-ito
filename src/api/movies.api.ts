import axios from "axios";
import { API_KEY, MOVIEDB_API_URL } from "../utils/constants";

export const GetPopularMovies = (page: number) => {
  return axios.get(
    MOVIEDB_API_URL + `movie/popular?api_key=${API_KEY}&page=${page}`
  );
};

export const GetSearchMovies = (page: number, query: string) => {
  return axios.get(
    MOVIEDB_API_URL +
      `search/movie?api_key=${API_KEY}&page=${page}&query=${query}`
  );
};

export const GetDetailMovie = (id: number) => {
  return axios.get(MOVIEDB_API_URL + `movie/${id}?api_key=${API_KEY}`);
};
