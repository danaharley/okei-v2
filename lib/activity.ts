import { db } from "@/lib/db";

export const getAllActivity = async (userId: string) => {
  try {
    const activities = await db.activity.findMany({
      where: {
        receiverId: userId,
        NOT: {
          performerId: userId,
        },
      },
      include: {
        performer: true,
        receiver: true,
        follow: {
          include: {
            follower: true,
            following: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        hasActivity: false,
      },
    });

    return activities;
  } catch {
    return null;
  }
};
