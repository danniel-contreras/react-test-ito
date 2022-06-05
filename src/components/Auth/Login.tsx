import React, { SetStateAction } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { loginSchema } from "../../validations/yup.validation";
import { LoginMethod } from "../../api/login.api";
import { useAppDispatch } from "../../hooks/useRedux";
import { setLogin } from "../../redux/authSlice";
import { SetToken } from "../../api/token";

interface Props {
  setLoginLoading: React.Dispatch<SetStateAction<boolean>>;
}

export const Login = ({ setLoginLoading }: Props) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setLoginLoading(true);
      LoginMethod(values)
        .then(({ data }) => {
          const nData = { ...data, isLoggedIn: true };
          SetToken(data.token);
          dispatch(setLogin(nData));
          setLoginLoading(false);
        })
        .catch(() => {
          setLoginLoading(false);
        });
    },
  });
  return (
    <form
      className="max-w-full w-full px-3 mt-2"
      onSubmit={formik.handleSubmit}
      autoComplete="off"
    >
      <div>
        <label className="text-xs font-semibold text-gray-500">Email</label>
        <div className="relative max-w-full text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="button"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <Icon icon={faUser} />
            </button>
          </span>
          <input
            autoComplete="NONE"
            type="email"
            name="email"
            onChange={formik.handleChange}
            className={
              "py-2 w-full text-sm  rounded-md pl-10 border-2 " +
              (formik.touched.email && formik.errors.email && "border-red-400")
            }
            placeholder="Enter your email..."
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <span className="text-sm font-normal text-red-400">
            {formik.errors.email}
          </span>
        )}
      </div>
      <div className="mt-2">
        <label className="text-xs font-semibold text-gray-500">Password</label>
        <div className="relative max-w-full text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="button"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <Icon icon={faKey} />
            </button>
          </span>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            className={
              "py-2 w-full text-sm  rounded-md pl-10 border-2 " +
              (formik.touched.password &&
                formik.errors.password &&
                "border-red-400")
            }
            placeholder="Enter your password..."
          />
        </div>
        {formik.errors.password && formik.touched.password && (
          <span className="text-sm font-normal text-red-400">
            {formik.errors.password}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-400 text-white w-full mt-3 py-2 font-semibold rounded-lg"
      >
        Log in
      </button>
    </form>
  );
};
