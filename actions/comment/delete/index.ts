"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { currentUser } from "@/lib/auth";
import { getPostById } from "@/lib/post";
import { db } from "@/lib/db";
import { getCommentById } from "@/lib/comment";

import { DeleteCommentSchema } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { postId, id } = data;

  const user = await currentUser();

  if (!user || !user.id)
    return {
      error: "Unauthenticated.",
    };

  const existingPost = await getPostById(postId);

  if (!existingPost)
    return {
      error: "No post.",
    };

  const existingComment = await getCommentById(id);

  if (!existingComment)
    return {
      error: "No comment.",
    };

  if (existingComment.userId !== user.id) {
    return {
      error: "You're not authorized to perform this action.",
    };
  }

  let comment;

  try {
    comment = await db.comment.delete({
      where: {
        id,
        postId: existingPost.id,
        userId: user.id,
      },
    });
  } catch (error) {
    console.log({ error });

    return {
      error: "Failed to delete comment.",
    };
  }

  revalidatePath(`/${user.username}/post/${postId}`);

  return { data: comment };
};

export const deleteComment = createSafeAction(DeleteCommentSchema, handler);
