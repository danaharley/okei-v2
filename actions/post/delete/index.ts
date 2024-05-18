"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getPostById } from "@/lib/post";

import { InputType, ReturnType } from "./types";
import { DeletePost } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id } = data;

  const user = await currentUser();

  if (!user) {
    return {
      error: "Unauthenticated.",
    };
  }

  const existingPost = await getPostById(id);

  if (!existingPost) {
    return {
      error: "No post.",
    };
  }

  if (existingPost.userId !== user.id) {
    return {
      error: "You're not authorized to perform this action.",
    };
  }

  let post;

  try {
    post = await db.post.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  } catch (error) {
    console.log({ error });

    return {
      error: "Failed to delete post.",
    };
  }

  revalidatePath("/");

  return { data: post };
};

export const deletePost = createSafeAction(DeletePost, handler);
