import { useState } from "react";
import Logo from "../assets/site-logo.png";
import { Login } from "../components/Auth/Login";
import Lottie from "lottie-react";
import dotsLoading from "../assets/lottie/loading-spinner.json";

export const Auth = () => {
  const [loginloading, setLoginloading] = useState<boolean>(false);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {loginloading ? (
        <Lottie autoplay={true} loop={true} animationData={dotsLoading} />
      ) : (
        <div className="border-2 flex flex-col items-center p-6 shadow-lg rounded-xl w-72 md:w-80 h-auto">
          <img className=" w-44" src={Logo} />
          <Login setLoginLoading={setLoginloading} />
        </div>
      )}
    </div>
  );
};
