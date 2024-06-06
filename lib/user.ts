import { User } from "@prisma/client";

import { db } from "@/lib/db";

import { UserWithFollow } from "@/types";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserByUsername = async (
  username: string,
): Promise<UserWithFollow | null> => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        followers: true,
        followings: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByUserId = async (id: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getAllUsers = async (): Promise<User[] | null> => {
  try {
    const users = await db.user.findMany();

    return users;
  } catch {
    return null;
  }
};
