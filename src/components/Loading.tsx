import Lottie from "lottie-react";
import Loader from "../assets/lottie/infinite-scroll-loader.json";

export const Loading = () => {
  return <Lottie autoplay={true} loop={true} animationData={Loader} />;
};
