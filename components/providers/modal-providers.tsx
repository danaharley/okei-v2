"use client";

import { useEffect, useState } from "react";

import { CreatePostModal } from "@/components/modals/create-post-modal";
import { CommentPostModal } from "@/components/modals/comment-post-modal";
import { EditProfileModal } from "@/components/modals/edit-profile-modal";

export const ModalProviders = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreatePostModal />
      <CommentPostModal />
      <EditProfileModal />
    </>
  );
};
