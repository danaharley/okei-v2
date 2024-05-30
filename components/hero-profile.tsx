"use client";

import * as React from "react";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";

import { useModalStore } from "@/hooks/use-modal-store";

import { UserSession } from "@/types";

import { siteConfig } from "@/config/site";

type HeroProfileProps = {
  user: UserSession;
  editable: boolean;
};

export const HeroProfile = ({ editable, user }: HeroProfileProps) => {
  const { onOpen } = useModalStore();

  return (
    <div className="space-y-4 px-3 py-4 md:px-0 md:py-8">
      <div className="flex items-center justify-between">
        <div className="pr-3">
          <h1 className="text-2xl font-bold text-okei-primary">{user.name}</h1>
          <p className="text-[15px] font-normal">{user.username}</p>
        </div>
        <UserAvatar
          src={user.image ? user.image : siteConfig.image.url}
          alt={user.username ? user.username : "profile"}
          className="mr-0 h-16 w-16 md:h-[84px] md:w-[84px]"
        />
      </div>
      {/* TODO:  */}
      {/* <p className="text-[15px] font-normal text-okei-primary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
        repellendus! Soluta ullam commodi nostrum maiores blanditiis. Iure eius
        molestiae beatae!
      </p>
      <p className="text-[15px] font-normal text-[#999999] dark:text-[#777777]">
        500K followers
      </p> */}
      {editable && (
        <Button
          variant="outline"
          className="h-[34px] w-full rounded-xl text-[15px] font-semibold text-okei-primary"
          onClick={() => onOpen("editProfile", { user })}
        >
          Edit profile
        </Button>
      )}
    </div>
  );
};
