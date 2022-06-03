export interface IUser {
  token: string;
}

export type UserState = {
  token:string,
  isLoggedIn: boolean,
};

export type UserAction = {
  type: string;
  payload: IUser | undefined;
};

export type DispatchType = (args: UserAction) => UserAction;
