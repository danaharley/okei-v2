"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Ellipsis, Trash } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { PostContent } from "@/components/post/post-content";
import { ActionMenu } from "@/components/action-menu";
import { ButtonIcon } from "@/components/button-icon";

import { CommentWithUser } from "@/types";
import { useAction } from "@/hooks/use-action";
import { deleteComment } from "@/actions/comment/delete";

type PostCommentProps = {
  comments: CommentWithUser[];
};

export const PostComment = ({ comments }: PostCommentProps) => {
  const params = useParams<{ profile: string; postId: string }>();

  const { execute, isLoading } = useAction(deleteComment, {
    onSuccess: () => {
      toast.success("Comment deleted.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (id: string) => {
    execute({ postId: params.postId, id });
  };

  return (
    <>
      {comments && comments.length ? (
        <>
          <Separator className="bg-okei-secondary/30" />
          <p className="px-3 py-4 font-medium tracking-tight text-okei-primary md:px-0">
            Replies
          </p>
          <Separator className="bg-okei-secondary/30" />

          {comments && comments.length
            ? comments.map((comment) => (
                <React.Fragment key={comment.id}>
                  <div className="relative px-3 py-4 md:px-0">
                    <PostContent
                      username={comment.user.username}
                      userImage={comment.user.image}
                      postContent={comment.content}
                      postDate={comment.createdAt}
                    />
                    <ActionMenu
                      align="end"
                      alignOffset={0}
                      icon={Ellipsis}
                      className="absolute right-3 top-3 ml-auto md:right-0"
                    >
                      <ButtonIcon
                        icon={Trash}
                        title="Delete"
                        className="h-full w-full justify-start border-none p-1.5 text-destructive hover:text-destructive"
                        iconStyle="mr-2 h-4 w-4 text-destructive"
                        onClick={() => onDelete(comment.id)}
                        disabled={isLoading}
                      />
                    </ActionMenu>
                  </div>
                  <Separator className="bg-okei-secondary/30" />
                </React.Fragment>
              ))
            : null}
        </>
      ) : null}
    </>
  );
};
