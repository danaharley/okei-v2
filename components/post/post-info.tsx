import { Dot } from "lucide-react";

import { UserAvatar } from "@/components/user-avatar";

import { cn } from "@/lib/utils";

import { CommentWithUser, LikeWithUser } from "@/types";

import { siteConfig } from "@/config/site";

type PostInfoProps = {
  likes: LikeWithUser[];
  comments: CommentWithUser[];
};

export const PostInfo = ({ likes, comments }: PostInfoProps) => {
  return (
    <div className="mt-1.5 flex w-full items-center">
      <div
        className={cn(
          "mr-2 flex w-9 max-w-9 flex-row-reverse justify-center gap-0.5",
          likes.length >= 3 && "flex-wrap-reverse",
        )}
      >
        {likes && likes.length && likes[0] ? (
          <UserAvatar
            src={
              likes[0]?.user?.image
                ? likes[0]?.user?.image
                : siteConfig.image.url
            }
            alt="profile"
            className={cn(
              "mr-0 h-4 w-4",
              likes.length === 2 && "h-5 w-5 border",
            )}
          />
        ) : null}
        {likes && likes.length && likes[1] ? (
          <UserAvatar
            src={
              likes[1]?.user?.image
                ? likes[1]?.user?.image
                : siteConfig.image.url
            }
            alt="profile"
            className={cn(
              "mr-0 h-5 w-5",
              likes.length === 2 && "z-10 -mr-2 border",
            )}
          />
        ) : null}

        {likes && likes.length && likes[2] ? (
          <UserAvatar
            src={
              likes[2]?.user?.image
                ? likes[2]?.user?.image
                : siteConfig.image.url
            }
            alt="profile"
            className="mr-0 h-3 w-3"
          />
        ) : null}
      </div>
      {!!comments && !!comments.length && (
        <span className="text-[13px] font-normal text-okei-secondary transition">
          {comments.length} {comments.length > 1 ? "replies" : "reply"}
        </span>
      )}

      {!!likes && !!likes.length && !!comments && !!comments.length && (
        <Dot className="mx-0.5 h-3 w-3 text-okei-secondary" />
      )}

      {!!likes && !!likes.length && (
        <span className="text-[13px] font-normal text-okei-secondary transition">
          {likes.length} {likes.length > 1 ? "likes" : "like"}
        </span>
      )}
    </div>
  );
};
