import UserList from "@/components/user-list";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const SearchPage = async () => {
  const currUser = await currentUser();

  const users = await db.user.findMany({
    include: {
      followers: true,
      followings: true,
    },
  });

  const filteredUser = users && users.filter((user) => user.id !== currUser.id);

  return <UserList users={filteredUser} />;
};

export default SearchPage;
