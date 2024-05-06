import * as z from "zod";

export const RegisterSchema = z.object({
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
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
