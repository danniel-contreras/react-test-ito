import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDetailMovie } from "../api/movies.api";
import { Layout } from "../components/Layout";
import { Result } from "../interfaces/redux.interface";
import { IMG_URL } from "../utils/constants";

export const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Result>();

  const getDet = (id: string | undefined) => {
    GetDetailMovie(Number(id)).then(({ data }) => {
      setMovie(data);
      document.title = data.original_title
    });
  };

  useEffect(() => {
    return getDet(id);
  }, [id]);
  return (
    <Layout>
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
          <ul className="flex mt-4">
            {movie?.genres &&
              movie.genres.map((gen, index: number) => (
                <li
                  className={
                    "bg-gray-600 mx-4 px-6 py-2 font-semibold whitespace-nowrap text-white " +
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
                  <li key={index}>
                    <img className="w-24" src={IMG_URL + company.logo_path} alt="" />
                  </li>
                ))}
            </ul>
          </p>
        </div>
      </div>
    </Layout>
  );
};
