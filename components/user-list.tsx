"use client";

import * as React from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { UserInfoContainer } from "@/components/user-info-container";

import { siteConfig } from "@/config/site";

import { UserWithFollow } from "@/types";

type UserListProps = {
  users: UserWithFollow[] | null;
};

const UserList = ({ users }: UserListProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredUser, setFilteredUser] = React.useState<
    UserWithFollow[] | null
  >(users);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredUser(users);
    } else {
      setFilteredUser(
        users &&
          users.filter(
            (user) =>
              user.name?.toLowerCase().includes(query.toLowerCase()) ||
              user.username?.toLowerCase().includes(query.toLowerCase()),
          ),
      );
    }
  };

  return (
    <div className="mx-3 space-y-10 pt-4 md:mx-0">
      <Input
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
        className="h-full w-full rounded-xl border-transparent bg-okei-foreground p-4 text-[15px] text-okei-primary placeholder:font-light placeholder:text-okei-secondary focus-visible:border focus-visible:border-okei-secondary/60 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {!filteredUser?.length ? (
        <div className="p-8 text-center">
          <p className="font-semibold">No users</p>
        </div>
      ) : (
        <div>
          {filteredUser.map((user) => (
            <Link key={user.id} href={`/${user.username}`}>
              <UserInfoContainer
                userImage={user.image ? user.image : siteConfig.image.url}
                username={user.username ? user.username : "user"}
                altimage={user.username ? user.username : "profile"}
                content={user.name ? user.name : ""}
                followersCount={user.followers.length}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
