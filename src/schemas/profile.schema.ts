import * as yup from "yup";

export const editProfileSchema = yup.object({
   username: yup
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .required("Username is required"),
});

export const changePasswordSchema = yup.object({
   currentPassword: yup
      .string()
      .min(8, "Min 8 characters")
      .required("Current password is required"),
   newPassword: yup.string().min(8, "Min 8 characters").required("New password is required"),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords do not match")
      .required("Please confirm your new password"),
});

export type EditProfileFormData = yup.InferType<typeof editProfileSchema>;
export type ChangePasswordFormData = yup.InferType<typeof changePasswordSchema>;
