import { useEffect, useState, lazy, Suspense } from "react";
import { Layout } from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { MoviesState } from "../interfaces/redux.interface";
import { searchMovies, setMovies } from "../redux/actions/movies.action";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Lottie from "lottie-react";
import NoResult from "../assets/lottie/search-not-found.json";
import { Loading } from "../components/Loading";

//Lazy components
const MovieInfo = lazy(() => import("../components/Movies/MovieInfo"));
const Pagination = lazy(() => import("../components/Pagination"));

export const Home = () => {
  //dispatch react redux
  const dispatch = useAppDispatch();

  //react use states
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>();

  //funtion to search a movie with the title or get all popular movies
  const searchMovie = (page: number, query: string | undefined) => {
    //if search option
    if (query !== "" && typeof query !== "undefined") {
      dispatch<any>(searchMovies(page, query));
      return;
    }
    //if get all option
    dispatch<any>(setMovies(page));
    //up to top on change page 
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //react redux state selector
  const movies: MoviesState = useAppSelector((state) => state.movies.movies);

  //react effect to search a movie or get all
  useEffect(() => {
    return searchMovie(page, query);
  }, [page, query]);

  // react effect to change title
  useEffect(() => {
    return () => {
      document.title = "Home";
    };
  }, []);
  return (
    <Layout>
      <div className="text-lg text-gray-500 font-semibold my-4">
        Most Popular Movies
      </div>
      <div className="flex my-8">
        <label htmlFor="" className="font-bold text-gray-500 text-xs mt-2">
          Search
        </label>
        <div className="relative ml-2 w-full max-w-full text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="button"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <Icon icon={faSearch} />
            </button>
          </span>
          <input
            autoComplete="NONE"
            onChange={(e) => setQuery(e.currentTarget.value)}
            type="search"
            name="search"
            placeholder="Type to search a movie..."
            className="pl-10 border w-full py-1 rounded"
          />
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
          {movies.results.map((mov, index) => (
            <MovieInfo key={index} mov={mov} />
          ))}
        </div>
        <Pagination
          pageSize={movies.results.length}
          currentPage={movies.page}
          last={movies.total_pages >= 500 ? 500 : movies.total_pages}
          onPageChange={setPage}
          totalCount={
            movies.total_pages >= 500 ? 500 * 20 : movies.total_results
          }
          siblingCount={4}
        />
        {movies && movies.results.length <= 0 && (
          <div className="w-80 ml-20 md:ml-44 mt-20">
            <Lottie autoplay={true} loop={true} animationData={NoResult} />
          </div>
        )}
      </Suspense>
    </Layout>
  );
};
