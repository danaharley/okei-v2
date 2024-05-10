"use client";

import { useEffect, useState } from "react";

import { CreatePostModal } from "@/components/modals/create-post-modal";

export const ModalProviders = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreatePostModal />
    </>
  );
};
