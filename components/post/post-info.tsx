import { Dot } from "lucide-react";

import { UserAvatar } from "@/components/user-avatar";

import { cn } from "@/lib/utils";

import { LikeWithUser } from "@/types";

type PostInfoProps = {
  likes: LikeWithUser[];
};

export const PostInfo = ({ likes }: PostInfoProps) => {
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
                : "https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
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
                : "https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
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
                : "https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
            }
            alt="profile"
            className="mr-0 h-3 w-3"
          />
        ) : null}
      </div>
      {likes && likes.length ? (
        <>
          <span className="text-[15px] font-light text-okei-secondary transition">
            180 replies
          </span>
          <Dot className="mx-0.5 h-3 w-3 text-okei-secondary" />
          <span className="text-[15px] font-light text-okei-secondary transition">
            {likes.length} likes
          </span>
        </>
      ) : null}
    </div>
  );
};
