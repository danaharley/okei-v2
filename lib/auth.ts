import { auth } from "@/auth";
import { UserWithoutPassword } from "@/types";

export const currentUser = async () => {
  const session = await auth();

  return session?.user as UserWithoutPassword;
};
