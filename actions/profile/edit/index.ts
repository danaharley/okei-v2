"use server";

import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EditProfileSchema } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { name, email, username, image } = data;

  const user = await currentUser();

  if (!user || !user.id) {
    return {
      error: "Unauthenticated.",
    };
  }

  let updateUser;

  try {
    updateUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        email,
        username,
        image,
      },
    });
  } catch (error) {
    console.log({ error });

    return {
      error: "Failed to update user",
    };
  }

  revalidatePath(`/${user.username}`);

  return { data: updateUser };
};

export const editProfile = createSafeAction(EditProfileSchema, handler);
