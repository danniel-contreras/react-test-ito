import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("The email field is requiered")
    .email("Invalid email address format"),
  password: yup.string().required("The password field is requiered"),
});
