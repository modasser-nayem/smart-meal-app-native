import * as yup from "yup";

export const createGroupSchema = yup.object({
   name: yup
      .string()
      .min(3, "Group name must be at least 3 characters")
      .max(50, "Group name must be at most 50 characters")
      .required("Group name is required"),
   description: yup.string().max(500, "Description must be at most 500 characters").defined(),
   location: yup.string().max(100, "Location must be at most 100 characters").defined(),
});

export type CreateGroupFormData = yup.InferType<typeof createGroupSchema>;
