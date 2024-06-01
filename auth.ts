import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";

import { db } from "@/lib/db";
import { getUserByUserId } from "@/lib/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (token.username && session.user) {
        session.user.username = token.username;
      }

      if (token.name && session.user) {
        session.user.name = token.name;
      }

      if (token.email && session.user) {
        session.user.email = token.email;
      }

      if (!token.image || (token.image && session.user)) {
        session.user.image = token.image;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserByUserId(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.username = existingUser.username;
      token.role = existingUser.role;
      token.username = existingUser.username;
      token.image = existingUser.image;

      return token;
    },
  },
  trustHost: true,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
