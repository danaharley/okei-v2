"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import { CreatePostSchema } from "./schema";

import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { content } = data;

  console.log("data :", content);

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

    throw error;
  }

  return { data: post };
};
export const createPost = createSafeAction(CreatePostSchema, handler);
