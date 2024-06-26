import { Session, type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import {
  Activity,
  Comment,
  Follow,
  Like,
  Post,
  User,
  UserRole,
} from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      role: UserRole;
      username: string | null;
      hasActivity: boolean | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role: UserRole;
    username: string | null;
    image: string | null;
    hasActivity: boolean | null;
  }
}

export type UserSession = Session["user"];

export type UserWithoutPassword = Omit<User, "password">;

export type UserWithFollow = UserWithoutPassword & { followers: Follow[] } & {
  followings: Follow[];
};

export type PostWithUser = Post & { user: UserWithoutPassword };

export type LikeWithUser = Like & { user: UserWithoutPassword };

export type CommentWithUser = Comment & { user: UserWithoutPassword };

export type PostWithUserWithLike = Post & {
  user: UserWithoutPassword;
} & {
  likes: LikeWithUser[];
};

export type PostWithUserWithLikeWithComment = Post & {
  user: UserWithoutPassword;
} & {
  likes: LikeWithUser[];
} & {
  comments: CommentWithUser[];
};

export type ActivityWithUserWithFollow = Activity & {
  user: UserWithoutPassword;
} & { follow: Follow };
