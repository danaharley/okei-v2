"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { FollowSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { followerId, followingId } = data;

  if (!followerId || !followingId) {
    return {
      error: "Invalid ID.",
    };
  }

  if (followerId === followingId) {
    return {
      error: "Users cannot follow themselves",
    };
  }

  const user = await currentUser();

  if (!user || !user.id) {
    return {
      error: "Unauthenticated.",
    };
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  });

  let updateFollow;

  try {
    if (existingFollow) {
      updateFollow = await db.follow.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      updateFollow = await db.follow.create({
        data: {
          followerId,
          followingId,
        },
      });

      await db.activity.create({
        data: {
          type: "FOLLOW",
          content: "Followed you",
          userId: user.id,
        },
      });

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          hasActivity: true,
        },
      });
    }
  } catch (error) {
    console.log({ error });

    return {
      error: "Failed to follow user.",
    };
  }

  revalidatePath(`/${user.username}`);

  return { data: updateFollow };
};

export const follow = createSafeAction(FollowSchema, handler);
