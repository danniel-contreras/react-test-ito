import React from "react";
import { Layout } from "../components/Layout";
import Lottie from "lottie-react";
import Error404 from "../assets/lottie/error-404.json";

export const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col w-full mt-20 justify-center items-center">
        <Lottie autoplay={true} loop={true} animationData={Error404} />
        <p className="mt-16 text-2xl text-center uppercase w-96 font-semibold text-gray-500">
        this page doesn't exist, please check the URL and try again
        </p>
      </div>
    </Layout>
  );
};
