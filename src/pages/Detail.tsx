import { useEffect, useState,Suspense } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useParams } from "react-router-dom";
import { GetDetailMovie } from "../api/movies.api";
import { Layout } from "../components/Layout";
import { Result } from "../interfaces/redux.interface";
import { IMG_URL } from "../utils/constants";
import { reColor } from "../utils/proggress-color";

import Lottie from "lottie-react";
import Loading from "../assets/lottie/double-loader.json";

export const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Result>();

  const getDet = (id: string | undefined) => {
    GetDetailMovie(Number(id)).then(({ data }) => {
      setMovie(data);
      document.title = data.original_title;
    });
  };

  useEffect(() => {
    return getDet(id);
  }, [id]);
  return (
    <Layout>
      <Suspense fallback={<Lottie autoplay={true} loop={true} animationData={Loading} />}>
      <div>
        <div
          style={{
            backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.7), 
              rgba(0, 0, 0, 0.7)
            ),
            url(${IMG_URL + movie?.backdrop_path}`,
            backgroundSize: "cover",
          }}
          className="w-screen left-0 absolute h-72 md:h-96 border"
        ></div>
        <img
          className="h-52 md:h-64 rounded absolute top-52 md:top-64  left-6 shadow-xl"
          src={IMG_URL + movie?.poster_path}
        />
      </div>
      <div className="mt-96">
        <div className="mt-24 absolute">
          <p className=" text-2xl  text-gray-500 font-semibold">
            {movie?.original_title}
          </p>
          <p>({movie?.release_date})</p>
          <ul className="flex mt-4">
            {movie?.genres &&
              movie.genres.map((gen, index: number) => (
                <li
                  className={
                    "bg-gray-600 mx-4 px-6 py-2 text-xs md:text-base font-semibold whitespace-nowrap text-white " +
                    (Number(index) === 0 ? "mx-0 mr-4" : "mx-4")
                  }
                  key={index}
                >
                  {gen.name}
                </li>
              ))}
          </ul>
          <p className="text-lg font-semibold text-gray-500 mt-4">Synopsis:</p>
          <p className=" text-gray-500 font-semibold mr-16 mt-4">
            {movie?.overview}
          </p>
          <p className="text-lg font-semibold text-gray-500 mt-8">
            Populararity: {movie?.popularity}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <p className="text-lg font-semibold text-gray-500 mt-8">
            Production Countries:
            <ul className="mt-2">
              {movie?.production_countries &&
                movie.production_countries.map((country, index) => (
                  <li key={index} className="text-base">
                    •{country.name}
                  </li>
                ))}
            </ul>
          </p>
          <p className="text-lg font-semibold text-gray-500 mt-8 mb-8">
            Production Companies:
            <ul className="mt-2">
              {movie?.production_companies &&
                movie.production_companies.map((company, index) => (
                  <li className="flex" key={index}>
                    <img
                      className="w-16"
                      src={IMG_URL + company.logo_path}
                      alt=""
                    />
                  </li>
                ))}
            </ul>
          </p>
          </div>
          <p className="text-gray-500 font-semibold text-lg flex flex-col">
            Average:
            <div className="w-16 mt-4">
            {typeof movie !== "undefined" && (
              <CircularProgressbar
                value={movie?.vote_average && movie.vote_average * 10}
                text={`${movie?.vote_average * 10}%`}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "#223D50",
                  textColor: "#fff",
                  pathColor: reColor(movie?.vote_average * 10),
                  trailColor: "transparent",
                })}
              ></CircularProgressbar>
            )}
            </div>
            <p className="text-xs mt-2">Total votes: {movie?.vote_count}</p>
          </p>
        </div>
        
      </div>
      </Suspense>
    </Layout>
  );
};
