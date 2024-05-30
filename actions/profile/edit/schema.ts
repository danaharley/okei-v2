import * as z from "zod";

export const EditProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({
    message: "This field has to be filled.",
  }),
  username: z
    .string()
    .min(1, {
      message: "Username is required",
    })
    .toLowerCase()
    .transform((value) => value.replace(/\s+/g, "")),
  image: z.optional(z.string()),
});
