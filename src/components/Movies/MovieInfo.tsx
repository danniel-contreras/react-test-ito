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

interface Props {
  mov: Result;
  setReload?: React.Dispatch<SetStateAction<boolean>>;
}

export const MovieInfo = ({ mov, setReload }: Props) => {
  const [isFav, setIsFav] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const removeFromFav = (mov: Result) => {
    removeMovie(mov);
    if (typeof setReload !== "undefined") {
        console.log("hola")
      setReload(true);
    }
  };

  return (
    <div className=" min-h-96 h-96 grid rounded grid-cols-2 w-full border-2 cursor-pointer mb-5">
      <div style={{ maxWidth: "50%" }} className="min-h-96 h-96 absolute">
        <div className="absolute z-10 self-end justify-self-start -bottom-2 -left-2">
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
        <LazyLoadImage
          className="h-full w-full md:w-auto"
          width={"250px"}
          height={"100%"}
          src={IMG_URL + mov.poster_path}
          alt=""
          effect="blur"
        />
      </div>

      <div
        style={{ marginLeft: "100%" }}
        className="flex flex-col p-3 h-auto px-8 items-center w-full"
      >
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
              onClick={() => addFavoriteMovie(mov)}
              className="text-blue-400"
              icon={Empty}
            />
          )}
        </span>
        <span className="text-ellipsis h-10 overflow-hidden text-center text-sm font-bold text-gray-500">
          {mov.original_title}
        </span>
        <span className="text-center text-xs font-bold text-gray-500 mt-2">
          {mov.release_date}
        </span>
        <p className=" text-ellipsis h-52 whitespace-no-wrap overflow-hidden text-xs text-justify font-semibold text-gray-500 mt-2">
          {isReadMore ? mov.overview.slice(0, 350) : mov.overview}
          <span className="text-blue-500">{isReadMore && "..."}</span>
        </p>
      </div>
    </div>
  );
};

interface PropsE {
  children: React.ReactNode;
}
function ProgressBody(props: PropsE) {
  return (
    <div>
      <div className="flex">
        <div style={{ width: "30%", paddingRight: 30 }}>{props.children}</div>
      </div>
    </div>
  );
}
