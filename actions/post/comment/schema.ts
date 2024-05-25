import * as z from "zod";

export const CommentPostSchema = z.object({
  postId: z.string(),
  content: z.string(),
});
