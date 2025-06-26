import * as yup from "yup";

export const loginSchema = yup
  .object({
    username: yup.string().trim().required("Please enter your username"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Password is too short - Minimum 6 characters"),
  })
  .required();
