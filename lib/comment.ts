import { db } from "@/lib/db";

export const getCommentById = async (id: string) => {
  try {
    const comment = await db.comment.findUnique({
      where: {
        id,
      },
    });

    return comment;
  } catch {
    return null;
  }
};
