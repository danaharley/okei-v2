"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPostById } from "@/lib/post";

import { InputType, ReturnType } from "./types";
import { CommentPostSchema } from "./schema";

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
  } catch (error) {
    console.log({ error });

    return {
      error: "Failed to create comment.",
    };
  }

  revalidatePath("/");

  return { data: comment };
};

export const commentPost = createSafeAction(CommentPostSchema, handler);
