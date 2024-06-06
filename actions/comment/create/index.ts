"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPostById } from "@/lib/post";

import { InputType, ReturnType } from "./types";
import { CreateCommentSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { postId, content } = data;

  const user = await currentUser();

  if (!user || !user.id)
    return {
      error: "Unauthenticated.",
    };

  const existingPost = await getPostById(postId);

  if (!existingPost)
    return {
      error: "No post",
    };

  let comment;

  try {
    comment = await db.comment.create({
      data: {
        content,
        userId: user.id,
        postId: existingPost.id,
      },
    });

    await db.activity.create({
      data: {
        type: "COMMENT",
        content: "Commented on your post",
        userId: user.id,
        postId: existingPost.id,
      },
    });

    await db.user.update({
      where: {
        id: existingPost.userId,
      },
      data: {
        hasActivity: true,
      },
    });
  } catch (error) {
    console.log({ error });

    return {
      error: "Failed to create comment.",
    };
  }

  revalidatePath("/");

  return { data: comment };
};

export const commentPost = createSafeAction(CreateCommentSchema, handler);
