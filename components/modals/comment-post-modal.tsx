"use client";

import { ModalWrapper } from "@/components/modals/modal-wrapper";

type CommentPostModalProps = {};

export const CommentPostModal = ({}: CommentPostModalProps) => {
  return (
    <ModalWrapper
      open={false}
      onOpenChange={() => {}}
      title="Reply"
      className="h-min md:max-h-[90%]"
    >
      <div className="space-y-2 overflow-y-auto px-8 py-6">
        <p>comment modal</p>
      </div>
    </ModalWrapper>
  );
};
