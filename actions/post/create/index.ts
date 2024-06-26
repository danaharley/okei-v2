"use server";

import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { CreatePostSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { content } = data;

  const user = await currentUser();

  if (!user)
    return {
      error: "Unauthenticated.",
    };

  let post;

  try {
    post = await db.post.create({
      data: {
        content,
        userId: user.id!,
      },
    });
  } catch (error) {
    console.log({ error });

    return {
      error: "Failed to create post.",
    };
  }

  revalidatePath("/");

  return { data: post };
};
export const createPost = createSafeAction(CreatePostSchema, handler);
