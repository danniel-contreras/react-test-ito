import axios from "axios";
import { Login } from "../interfaces/login.interface";
import { LOGIN_URL } from "../utils/constants";

export const LoginMethod = async (data: Login) => {
  return axios.post(LOGIN_URL, data);
};
