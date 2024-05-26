import * as z from "zod";

export const CreateCommentSchema = z.object({
  postId: z.string(),
  content: z.string(),
});
