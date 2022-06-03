import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetToken } from "../api/token";
import { UserState } from "../interfaces/redux.interface";

const initialState = {
  auth: {
    token: GetToken(),
    isLoggedIn: GetToken() ? true : false,
  },
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<UserState>) {
      state.auth = action.payload;
    },
  },
});
