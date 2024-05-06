"use server";

import bcrypt from "bcryptjs";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { getUserByEmail, getUserByUsername } from "@/lib/user";

import { RegisterSchema } from "./schema";

import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { name, email, username, password } = data;

  const existingEmail = await getUserByEmail(email);

  if (existingEmail) {
    return {
      error: "Email is already in use.",
    };
  }

  const existingUsername = await getUserByUsername(username);

  if (existingUsername) {
    return {
      error: "Username is already in use.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let createUser;

  try {
    createUser = await db.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create user.",
    };
  }

  return { data: createUser };
};

export const register = createSafeAction(RegisterSchema, handler);
