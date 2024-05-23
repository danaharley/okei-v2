"use client";

import * as React from "react";
import { Ellipsis, Trash } from "lucide-react";
import { toast } from "sonner";

import { TimeAgo } from "@/components/time-ago";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

import { useAction } from "@/hooks/use-action";

import { deletePost } from "@/actions/post/delete";
import { likePost } from "@/actions/post/like";

import { cn } from "@/lib/utils";

import { PostWithUserWithLikeWithUser, UserWithoutPassword } from "@/types";

type PostContentProps = {
  user: UserWithoutPassword;
  post: PostWithUserWithLikeWithUser;
};

export const PostContent = ({ user, post }: PostContentProps) => {
  const hasLiked = React.useMemo(() => {
    const likedLists = post.likes;

    const lists = [];

    for (const i of likedLists) {
      lists.push(i["userId"]);
    }

    return lists.includes(user.id);
  }, [post.likes, user.id]);

  const { execute: executeDelete } = useAction(deletePost, {
    onSuccess: () => {
      toast.success("Post deleted.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeLike } = useAction(likePost, {
    onSuccess: () => {
      hasLiked ? toast.success("Unliked.") : toast.success("Liked.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (id: string) => {
    executeDelete({ id });
  };

  const onLike = (id: string) => {
    executeLike({ id });
  };

  return (
    <div className="flex">
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
            className="ml-2 text-okei-secondary"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="absolute -top-0.5 right-0 ml-auto h-8 w-8 rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Ellipsis className="h-4 w-4 text-okei-secondary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto" align="end" alignOffset={8}>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => onDelete(post.id)}
              >
                <Trash className="mr-2 h-4 w-4 text-destructive" />
                <span className="text-destructive">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div
          className="ml-2 whitespace-pre-line"
          style={{ whiteSpace: "pre-line" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="-mb-1.5 flex items-center">
          <Button
            onClick={() => onLike(post.id)}
            variant="outline"
            size="icon"
            className="rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Icons.love
              className={cn(
                "h-6 w-6 fill-transparent stroke-okei-primary/85",
                hasLiked && "fill-okei-like stroke-okei-like",
              )}
              strokeW="2"
            />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Icons.reply
              className="h-[22px] w-[22px] fill-transparent stroke-okei-primary/85"
              strokeW="2"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
