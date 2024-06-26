import { db } from "@/lib/db";

export const getPostsByUserId = async (userId: string) => {
  try {
    const posts = await db.post.findMany({
      where: {
        userId,
      },
    });

    return posts;
  } catch {
    return null;
  }
};

export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            emailVerified: true,
            hasActivity: true,
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
                hasActivity: true,
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
                hasActivity: true,
                image: true,
                role: true,
              },
            },
          },
        },
      },
    });

    return post;
  } catch {
    return null;
  }
};

export const getAllPosts = async () => {
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
            hasActivity: true,
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
                hasActivity: true,
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
                hasActivity: true,
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
    return;
  }
};

export const getPostsByUsername = async (username: string) => {
  try {
    const posts = await db.post.findMany({
      where: {
        user: {
          username,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            emailVerified: true,
            hasActivity: true,
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
                hasActivity: true,
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
                hasActivity: true,
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
