import * as z from "zod";

export const CreatePostSchema = z.object({
  content: z.string().min(1, { message: "This field is required!" }),
});
