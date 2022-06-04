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
          }}
          className="w-screen left-0 absolute h-96 border"
        ></div>
        <img
          className="h-64 rounded absolute top-64 left-6 shadow-xl"
          src={IMG_URL + movie?.poster_path}
        />
      </div>
    </Layout>
  );
};
