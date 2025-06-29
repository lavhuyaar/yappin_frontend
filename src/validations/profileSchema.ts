import * as yup from "yup";

export const profileSchema = yup.object({
  firstName: yup
    .string()
    .required("Please enter your first name")
    .min(2, "First name must contain between 2 and 30 characters")
    .max(30, "First name must contain between 2 and 30 characters")
    .matches(/^[A-Z]+$/i, "First name must contain alphabets only"),
  lastName: yup
    .string()
    .required("Please enter your last name")
    .min(2, "Last name must contain between 2 and 30 characters")
    .max(30, "Last name must contain between 2 and 30 characters")
    .matches(/^[A-Z]+$/i, "Last name must contain alphabets only"),
  username: yup.string().trim().required("Please enter a unique username"),
  profilePicture: yup
    .mixed<File>()
    .nullable()
    .notRequired()
    .test(
      "fileType",
      "Profile picture must be .png, .jpg, .jpeg, .avif, or .webp",
      (value) => {
        if (value == null) return true;
        return (
          value instanceof File &&
          [
            "image/webp",
            "image/png",
            "image/avif",
            "image/jpg",
            "image/jpeg",
          ].some((t) => t === value.type)
        );
      }
    )
    .test("fileSize", "Profile picture cannot exceed 2MB", (value) => {
      if (value == null) return true;
      return value instanceof File && value.size <= 2 * 1024 * 1024;
    }),
});
