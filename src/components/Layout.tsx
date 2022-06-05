import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/site-logo.png";
import { useAppDispatch } from "../hooks/useRedux";
import { setLoggout } from "../redux/authSlice";
import Modal from "./Modal";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const loggout = () => {
    setShowModal(false);
    dispatch(setLoggout());
  };
  return (
    <div className="w-screen h-screen max-w-fit">
      <div className="bg-white h-auto flex justify-between w-screen border-b shadow">
        <img className="w-20 ml-8 py-2" src={Logo} alt="" />
        <div className="flex items-center mr-8">
          <p className="px-0 md:px-4 h-6 md:h-8 overflow-hidden  font-semibold text-sm md:text-lg text-gray-500">
            <NavLink
              className={({ isActive }) =>
                isActive ? "border-b-2 border-blue-400 px-1 md:px-3" : undefined
              }
              to="/"
            >
              Home
            </NavLink>
          </p>
          <p className="px-2 md:px-4 h-6 md:h-8  font-semibold text-sm md:text-lg text-gray-500">
            <NavLink
              className={({ isActive }) =>
                isActive ? "border-b-2 border-blue-400 px-1 md:px-3" : undefined
              }
              to="/favorites"
            >
              Favorites
            </NavLink>
          </p>
          <p
            onClick={() => setShowModal(!showModal)}
            className="font-semibold h-6 md:h-8 px-2 md:px-3 cursor-pointer text-sm md:text-lg text-gray-500"
          >
            Loggout
          </p>
        </div>
      </div>
      <div className=" overflow-auto pb-8 max-w-full mx-8 md:mx-20 lg:mx-14 ">
        {children}
      </div>
      <Modal setShowModal={setShowModal} showModal={showModal} title="">
        <p className="text-lg font-semibold text-gray-500">
          Are you sure to log out?
        </p>
        <div className="mt-2">
          <button
            onClick={loggout}
            className="bg-blue-400 px-8 py-2 rounded-xl text-white "
          >
            Yes
          </button>
          <button
            onClick={() => setShowModal(!showModal)}
            className="bg-red-400 ml-4 px-4 py-2 rounded-xl text-white "
          >
            No, Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};
