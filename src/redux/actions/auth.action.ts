import { ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/redux.interface";
import { AuthSlice } from "../authSlice";
import { RootState } from "../store";

export const loginActions = AuthSlice.actions;

export const setLogin = (
  data: IUser
): ThunkAction<void, RootState, unknown, AnyAction> => {
  const nData = { ...data, isLoggedIn: true };
  return (dispatch) => {
    dispatch(loginActions.setLogin(nData));
  };
};
