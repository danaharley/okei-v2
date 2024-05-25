import * as React from "react";

import { TimeAgo } from "@/components/time-ago";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";

type PostContentProps = {
  userImage: string | null;
  username: string | null;
  postDate?: Date;
  postContent?: string;
  showSeparator?: boolean;
  children?: React.ReactNode;
};

export const PostContent = ({
  userImage,
  username,
  postDate,
  postContent,
  showSeparator,
  children,
}: PostContentProps) => {
  return (
    <div className="relative flex">
      <div className="relative flex flex-col items-center">
        <div className="z-10 bg-background pb-2">
          <UserAvatar
            src={
              userImage
                ? userImage
                : "https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
            }
            alt={username || "profile"}
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
          <p className="ml-2 font-medium text-okei-primary">{username}</p>
          {postDate && (
            <TimeAgo
              timestamp={postDate}
              className="ml-1 text-base text-okei-secondary"
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
