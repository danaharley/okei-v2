"use client";

import * as React from "react";
import { Ellipsis, Trash } from "lucide-react";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { PostContent } from "@/components/post/post-content";
import { ActionMenu } from "@/components/action-menu";
import { ButtonIcon } from "@/components/button-icon";

import { useAction } from "@/hooks/use-action";
import { useModalStore } from "@/hooks/use-modal-store";

import { deletePost } from "@/actions/post/delete";
import { likePost } from "@/actions/post/like";

import { cn } from "@/lib/utils";

import { PostWithUserWithLike, UserSession } from "@/types";

type PostContainerProps = {
  user: UserSession;
  post: PostWithUserWithLike;
};

export const PostContainer = ({ user, post }: PostContainerProps) => {
  const { onOpen } = useModalStore();

  const hasLiked = React.useMemo(() => {
    const likedLists = post.likes;

    const lists = [];

    for (const i of likedLists) {
      lists.push(i["userId"]);
    }

    return lists.includes(user.id!);
  }, [post.likes, user.id]);

  const { execute: executeDelete, isLoading: isloadingDelete } = useAction(
    deletePost,
    {
      onSuccess: () => {
        toast.success("Post deleted.");
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const { execute: executeLike, isLoading: isloadingLike } = useAction(
    likePost,
    {
      onSuccess: () => {
        hasLiked ? toast.success("Unliked.") : toast.success("Liked.");
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const onDelete = (id: string) => {
    executeDelete({ id });
  };

  const onLike = (id: string) => {
    executeLike({ id });
  };

  return (
    <PostContent
      username={post.user.username}
      userImage={post.user.image}
      postDate={post.createdAt}
      postContent={post.content}
      showSeparator={!!post.likes.length}
    >
      <ActionMenu
        align="end"
        alignOffset={0}
        icon={Ellipsis}
        className="absolute -top-0.5 right-0 ml-auto"
      >
        <ButtonIcon
          icon={Trash}
          title="Delete"
          className="h-full w-full justify-start border-none p-1.5 text-destructive hover:text-destructive"
          iconStyle="mr-2 h-4 w-4 text-destructive"
          onClick={() => onDelete(post.id)}
          disabled={isloadingDelete}
        />
      </ActionMenu>
      <div className="-mb-1.5 flex items-center">
        <ButtonIcon
          onClick={() => onLike(post.id)}
          size="icon"
          className="rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          icon={Icons.love}
          iconStyle={cn(
            "h-6 w-6 fill-transparent stroke-okei-primary/85 stroke",
            hasLiked && "fill-okei-like stroke-okei-like",
          )}
          disabled={isloadingLike}
        />
        <ButtonIcon
          size="icon"
          className="rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          icon={Icons.reply}
          iconStyle={cn(
            "h-[22px] w-[22px] fill-transparent stroke-okei-primary/85",
          )}
          onClick={() => onOpen("commentPost", { post, user })}
        />
      </div>
    </PostContent>
  );
};
