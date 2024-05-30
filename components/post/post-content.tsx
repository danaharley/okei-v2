import * as React from "react";

import { TimeAgo } from "@/components/time-ago";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";

import { siteConfig } from "@/config/site";

type PostContentProps = {
  userImage: string | null;
  username: string | null;
  postDate?: Date;
  postContent?: string;
  showSeparator?: boolean;
  onNavigate?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactNode;
};

export const PostContent = ({
  userImage,
  username,
  postDate,
  postContent,
  showSeparator,
  onNavigate,
  children,
}: PostContentProps) => {
  return (
    <div className="relative flex">
      <div className="relative flex flex-col items-center">
        <div className="z-10 bg-background pb-2">
          <UserAvatar
            src={userImage ? userImage : siteConfig.image.url}
            alt={username ? username : "profile"}
            className="mr-0"
          />
        </div>
        {showSeparator && (
          <Separator
            orientation="vertical"
            className="absolute w-0.5 bg-okei-secondary/30"
          />
        )}
      </div>
      <div className="w-full">
        <div className="relative flex items-center">
          <div
            className="ml-2 text-[15px] font-medium text-okei-primary hover:cursor-pointer hover:underline"
            onClick={onNavigate}
          >
            {username}
          </div>
          {postDate && (
            <TimeAgo
              timestamp={postDate}
              className="ml-1 text-okei-secondary"
            />
          )}
        </div>
        {postContent && (
          <div
            className="ml-2 mt-0.5 whitespace-pre-line"
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: postContent }}
          />
        )}
        {children}
      </div>
    </div>
  );
};
