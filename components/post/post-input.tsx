"use client";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

import { useModalStore } from "@/hooks/use-modal-store";

export const PostInput = () => {
  const { onOpen } = useModalStore();

  return (
    <div
      className="hidden items-center border-b border-b-okei-secondary/30 py-4 md:flex"
      onClick={() => onOpen("createPost")}
    >
      <UserAvatar
        src="https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
        alt="profile"
      />
      <p className="text-sm font-light text-okei-secondary">
        Start a thread...
      </p>
      <Button className="ml-auto h-9 rounded-3xl text-[15px]">Post</Button>
    </div>
  );
};
