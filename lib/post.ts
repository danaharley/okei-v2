import { db } from "@/lib/db";

export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({ where: { id } });

    return post;
  } catch (error) {
    return null;
  }
};
