import { db } from "@/lib/db";

import { ActivityWithUser } from "@/types";
import { currentUser } from "./auth";

export const getAllActivity = async (): Promise<ActivityWithUser[] | null> => {
  const user = await currentUser();

  try {
    const activities = await db.activity.findMany({
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
      orderBy: {
        createdAt: "desc",
      },
    });

    await db.user.update({
      where: {
        id: user.id,
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
