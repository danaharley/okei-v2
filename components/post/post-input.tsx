"use client";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

import { useModalStore } from "@/hooks/use-modal-store";
import { useCurrentUser } from "@/hooks/use-current-user";

import { siteConfig } from "@/config/site";

export const PostInput = () => {
  const { onOpen } = useModalStore();

  const user = useCurrentUser();

  return (
    <div
      className="hidden items-center border-b border-b-okei-secondary/30 py-4 md:flex"
      onClick={() => onOpen("createPost", { user })}
    >
      <UserAvatar
        src={user?.image ? user.image : siteConfig.image.url}
        alt={user?.username ? user.username : "profile"}
      />
      <p className="text-sm font-light text-okei-secondary">
        Start a thread...
      </p>
      <Button className="ml-auto h-9 rounded-3xl text-[15px]">Post</Button>
    </div>
  );
};
