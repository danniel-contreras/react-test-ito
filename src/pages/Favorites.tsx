import { Result } from "postcss";
import { useEffect, useState } from "react";
import { getItems } from "../api/favotires.movies";
import { Layout } from "../components/Layout";
import MovieInfo from "../components/Movies/MovieInfo";
import Lottie from "lottie-react";
import searchEmpty from "../assets/lottie/search-not-found.json";

export const Favorites = () => {
  const [favorites, setFavorites] = useState<[]>();
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setReload(false);
    return setFavorites(getItems());
  }, [reload]);
  console.log(favorites)
  return (
    <Layout>
      <div className="text-lg text-gray-500 font-semibold my-4">
        My Favorites Movies
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl2:grid-cols-3 gap-8">
        {favorites && favorites.length > 0 && (
          <>
            {favorites.map((mov, index) => (
              <MovieInfo setReload={setReload} key={index} mov={mov} />
            ))}
          </>
        )}
      </div>
      <>
        {favorites && favorites.length <= 0 && (
          <div className="flex flex-col mt-8 justify-center w-full items-center">
           <div className="w-96">
           <Lottie autoplay={true} loop={true} animationData={searchEmpty} />
           </div>
            <p className="text-gray-500 mt-8 font-semibold text-lg">
              You don't have any favorite movies yet...
            </p>
          </div>
        )}
      </>
    </Layout>
  );
};
