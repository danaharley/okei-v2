"use client";

import * as React from "react";

import { UserAvatar } from "@/components/user-avatar";
import { TimeAgo } from "@/components/time-ago";
import { Separator } from "@/components/ui/separator";

type UserInfoContainerProps = {
  userImage: string;
  altimage: string;
  username: string;
  type: string;
  date: Date;
  content: string;
};

export const UserInfoContainer = ({
  userImage,
  altimage,
  username,
  date,
  // type,
  content,
}: UserInfoContainerProps) => {
  return (
    <div className="my-3 flex flex-row items-start">
      <UserAvatar
        src={userImage}
        alt={altimage}
        className="ml-3 h-9 w-9 md:ml-0"
      />
      <div className="w-full space-y-3">
        <div className="mr-3 flex items-center justify-between md:mr-0">
          <div className="text-[15px]">
            <div className="flex items-center space-x-1">
              <h1 className="font-semibold text-okei-primary">{username}</h1>
              <TimeAgo timestamp={date} />
            </div>
            <p className="text-okei-secondary">{content}</p>
          </div>
          {/* TODO */}
          {/* {type === "FOLLOW" && (
            <Button
              onClick={(e) => {
                e.preventDefault();
              }}
              variant="outline"
              className="h-[34px] min-w-28 rounded-xl text-[15px] font-semibold text-okei-primary"
            >
              Follow back
            </Button>
          )} */}
        </div>
        {/* {followersCount ? (
          <p className="mt-1.5 text-okei-primary">{`${followersCount} followers`}</p>
        ) : null} */}
        <Separator className="bg-okei-secondary/30" />
      </div>
    </div>
  );
};
