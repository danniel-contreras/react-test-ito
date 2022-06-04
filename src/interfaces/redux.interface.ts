export interface IUser {
  token: string;
}

export type UserState = {
  token: string;
  isLoggedIn: boolean;
};

export type UserAction = {
  type: string;
  payload: IUser | undefined;
};

export type DispatchType = (args: UserAction) => UserAction;

//for movies

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovies {
  results: Result[];
}

export interface IMovie {
  page: number;
}

export type MoviesState = {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
  error: string;
};

export type MovieAction = {
  type: string;
  payload: { page?: number };
};

export type DispatchTypeMov = (args: MovieAction) => MovieAction;
