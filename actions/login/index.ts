"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

import { createSafeAction } from "@/lib/create-safe-action";
import { getUserByEmail } from "@/lib/user";

import { InputType, ReturnType } from "./types";
import { LoginSchema } from "./schema";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { email, password } = data;

  const user = await getUserByEmail(email);

  if (!user) {
    return {
      error: "Invalid credentials.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials.",
          };

        default:
          return {
            error: "Something went wrong.",
          };
      }
    }

    throw error;
  }

  return {
    data: user,
  };
};

export const login = createSafeAction(LoginSchema, handler);
