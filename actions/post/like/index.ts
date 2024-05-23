"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { getPostById } from "@/lib/post";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";

import { LikePostSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id } = data;

  if (!id) {
    return {
      error: "Invalid ID.",
    };
  }

  const user = await currentUser();

  if (!user) {
    return {
      error: "Unauthenticated.",
    };
  }

  const existingPost = await getPostById(id);

  if (!existingPost) {
    return {
      error: "No Post.",
    };
  }

  const liked = await db.like.findFirst({
    where: {
      postId: existingPost.id,
      userId: user.id,
    },
  });

  let updateLiked;

  try {
    if (liked) {
      updateLiked = await db.like.delete({
        where: {
          id: liked.id,
        },
      });
    } else {
      updateLiked = await db.like.create({
        data: {
          postId: existingPost.id!,
          userId: user.id!,
        },
      });
    }
  } catch (error) {
    console.log({ error });

    return {
      error: "Failed to like post.",
    };
  }

  revalidatePath("/");

  return { data: updateLiked };
};

export const likePost = createSafeAction(LikePostSchema, handler);
