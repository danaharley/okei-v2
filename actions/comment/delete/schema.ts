import * as z from "zod";

export const DeleteCommentSchema = z.object({
  postId: z.string(),
  id: z.string(),
});
