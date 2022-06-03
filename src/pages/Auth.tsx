import React from "react";
import Logo from "../assets/site-logo.png";
import { Login } from "../components/Auth/Login";

export const Auth = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border-2 flex flex-col items-center p-6 shadow-lg rounded-xl w-72 md:w-80 h-auto">
        <img className=" w-44" src={Logo} />
        <Login />
      </div>
    </div>
  );
};
