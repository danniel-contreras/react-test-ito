export const SetToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const GetToken = () => {
  return localStorage.getItem("token");
};

export const RemoveToken = () => {
  localStorage.removeItem("token");
};
