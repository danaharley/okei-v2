"use client";

import { ModalWrapper } from "@/components/modals/modal-wrapper";
import { PostContent } from "@/components/post/post-content";
import { Input } from "@/components/ui/input";

import { useModalStore } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

type CommentPostModalProps = {};

export const CommentPostModal = ({}: CommentPostModalProps) => {
  const { isOpen, onClose, type, data } = useModalStore();

  const { post, user } = data;

  const isModalOpen = isOpen && type === "commentPost";

  const onModalClose = () => {
    onClose();
  };

  return (
    <ModalWrapper
      open={isModalOpen}
      onOpenChange={onModalClose}
      title="Reply"
      className="h-full md:h-min md:max-h-[90%]"
    >
      <div className="space-y-3 overflow-y-auto p-6">
        <PostContent
          username={post?.user.username!}
          userImage={post?.user.image!}
          postDate={post?.createdAt}
          postContent={post?.content}
          showSeparator={!!post?.content}
        />
        <PostContent username={user?.username!} userImage={user?.image!}>
          <form className="flex flex-col">
            <Input
              placeholder={`Reply to ${post?.user.username}...`}
              className="ml-2 h-6 border-none p-0 text-[15px] placeholder:text-okei-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="ml-auto mt-6">Post</Button>
          </form>
        </PostContent>
      </div>
    </ModalWrapper>
  );
};
