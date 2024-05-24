import * as React from "react";

import { TimeAgo } from "@/components/time-ago";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";

import { PostWithUserWithLikeWithUser } from "@/types";

type PostContainerProps = {
  post: PostWithUserWithLikeWithUser;
  children: React.ReactNode;
};

export const PostContainer = ({ post, children }: PostContainerProps) => {
  return (
    <div className="relative flex">
      <div className="relative flex flex-col items-center">
        <div className="z-10 bg-background pb-2">
          <UserAvatar
            src={
              post.user.image
                ? post.user.image
                : "https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
            }
            alt={post.user.username || "profile"}
            className="mr-0"
          />
        </div>
        {post.likes && post.likes.length ? (
          <Separator
            orientation="vertical"
            className="absolute w-0.5 bg-okei-secondary/30"
          />
        ) : null}
      </div>
      <div className="w-full">
        <div className="relative flex items-center">
          <p className="ml-2 font-medium text-okei-primary">
            {post.user.username}
          </p>
          <TimeAgo
            timestamp={post.createdAt}
            className="ml-1 text-base text-okei-secondary"
          />
        </div>
        {children}
      </div>
    </div>
  );
};
