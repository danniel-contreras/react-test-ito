import React, { SetStateAction, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { IMG_URL } from "../../utils/constants";
import { reColor } from "../../utils/proggress-color";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Result } from "../../interfaces/redux.interface";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faStar as Empty } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  addFavoriteMovie,
  isFavorite,
  removeMovie,
} from "../../api/favotires.movies";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  mov: Result;
  setReload?: React.Dispatch<SetStateAction<boolean>>;
}

function MovieInfo({ mov, setReload }: Props) {
  const [isFav, setIsFav] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  
  const removeFromFav = (mov: Result) => {
    removeMovie(mov);
    if (typeof setReload !== "undefined") {
      console.log("hola");
      setReload(true);
    }
    toast.error(`${mov.original_title} was removed from the list`);
  };

  const addToFav = (mov: Result) => {
    addFavoriteMovie(mov);
    toast.info(`${mov.original_title} was added to the list`);
  };

  return (
    <div className="min-h-96 h-auto grid rounded grid-cols-1 sm:grid-cols-2  w-full border-2 mb-5">
      <div>
        <Link to={`/movie/` + mov.id}>
          <LazyLoadImage
            className="cursor-pointer h-full w-40 sm:w-56 ml-20 sm:ml-0"
            src={IMG_URL + mov.poster_path}
            alt=""
            effect="blur"
          />
        </Link>
      </div>

      <div className=" flex flex-col h-auto px-8 w-full">
        <span
          onClick={() => setIsFav(!isFav)}
          className="float-right -mr-4 text-xl self-end"
        >
          {isFavorite(mov) ? (
            <Icon
              onClick={() => removeFromFav(mov)}
              className="text-blue-400"
              icon={faStar}
            />
          ) : (
            <Icon
              onClick={() => addToFav(mov)}
              className="text-blue-400"
              icon={Empty}
            />
          )}
        </span>
        <Link className="flex flex-col h-auto w-full" to={`/movie/` + mov.id}>
          <span className="text-ellipsis overflow-hidden text-center text-sm font-bold text-gray-500">
            {mov.original_title}
          </span>
          <span className="text-center text-xs font-bold text-gray-500">
            ({mov.release_date})
          </span>
          <p className="text-ellipsis whitespace-no-wrap overflow-hidden text-xs text-justify font-semibold text-gray-500 mt-2">
            {isReadMore ? mov.overview.slice(0, 225) : mov.overview}
            <span className="text-blue-500">{isReadMore && "..."}</span>
          </p>
        </Link>
        <div className="ml-auto mt-auto flex flex-col">
          <ProgressBody>
            <CircularProgressbar
              value={mov.vote_average * 10}
              text={`${mov.vote_average * 10}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#223D50",
                textColor: "#fff",
                pathColor: reColor(mov.vote_average * 10),
                trailColor: "transparent",
              })}
            ></CircularProgressbar>
          </ProgressBody>
        </div>
      </div>
    </div>
  );
}

interface PropsE {
  children: React.ReactNode;
}
function ProgressBody(props: PropsE) {
  return (
    <div>
      <div className="flex">
        <div className="w-10 md:w-12">{props.children}</div>
      </div>
    </div>
  );
}

export default MovieInfo;
