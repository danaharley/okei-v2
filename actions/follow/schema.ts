import * as z from "zod";

export const FollowSchema = z.object({
  followerId: z.string(),
  followingId: z.string(),
});
