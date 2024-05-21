import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Like, Post, User, UserRole } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role: UserRole;
  }
}

export type UserWithoutPassword = Omit<User, "password">;
export type PostWithUser = Post & { user: UserWithoutPassword };
export type LikeWithUser = Like & { user: UserWithoutPassword };
export type PostWithUserWithLikeWithUser = Post & {
  user: UserWithoutPassword;
} & {
  likes: LikeWithUser[];
};
