import { auth } from "@/auth";
import { UserSession } from "@/types";

export const currentUser = async () => {
  const session = await auth();

  return session?.user as UserSession["user"];
};
