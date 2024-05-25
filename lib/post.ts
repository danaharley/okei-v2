import { db } from "@/lib/db";

export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({ where: { id } });

    return post;
  } catch {
    return null;
  }
};

export const getAllposts = async () => {
  try {
    const posts = await db.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            emailVerified: true,
            image: true,
            role: true,
          },
        },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                email: true,
                emailVerified: true,
                image: true,
                role: true,
              },
            },
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                email: true,
                emailVerified: true,
                image: true,
                role: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch {
    return null;
  }
};
