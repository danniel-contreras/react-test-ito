import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/site-logo.png";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen max-w-fit">
      <div className="bg-white h-auto flex justify-between w-screen border-b shadow">
        <img className="w-20 ml-8 py-2" src={Logo} alt="" />
        <ul className="flex items-center mr-8">
          <li className="px-4 font-semibold text-lg text-gray-500">
            <NavLink
              className={({ isActive }) =>
                isActive ? "border-b-2 border-blue-400 px-3 text-xl" : undefined
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="px-4 font-semibold text-lg text-gray-500">
            <NavLink
              className={({ isActive }) =>
                isActive ? "border-b-2 border-blue-400 px-3 text-xl" : undefined
              }
              to="/favorites"
            >
              Favorites
            </NavLink>
          </li>
          <li className="px-4 font-semibold text-lg text-gray-500">Loggout</li>
        </ul>
      </div>
      <div className=" overflow-auto max-w-full mx-8 md:mx-20 lg:mx-14 ">
        {children}
      </div>
    </div>
  );
};
