"use client";

import * as React from "react";
import { toast } from "sonner";

import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";

import { useModalStore } from "@/hooks/use-modal-store";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useAction } from "@/hooks/use-action";

import { follow } from "@/actions/follow";

import { siteConfig } from "@/config/site";

import { UserWithFollow } from "@/types";

type HeroProfileProps = {
  user: UserWithFollow;
  canEditProfile: boolean;
};

export const HeroProfile = ({ user, canEditProfile }: HeroProfileProps) => {
  const currentUser = useCurrentUser();

  const { onOpen } = useModalStore();

  const hasFollowed = React.useMemo(() => {
    const followLists = user.followers;

    const lists = [];

    for (const i of followLists) {
      lists.push(i["followingId"]);
    }

    return lists.includes(currentUser?.id!);
  }, [currentUser?.id, user.followers]);

  const { execute, isLoading } = useAction(follow, {
    onSuccess: () => {
      hasFollowed ? toast.success("Unfollow.") : toast.success("Following.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onFollow = (followerId: string) => {
    execute({ followerId, followingId: currentUser?.id! });
  };

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
      {/* TODO: BIO */}
      {/* <p className="text-[15px] font-normal text-okei-primary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
        repellendus! Soluta ullam commodi nostrum maiores blanditiis. Iure eius
        molestiae beatae!
      </p> */}
      {user.followers && user.followers.length ? (
        <p className="text-[15px] font-normal text-[#999999] dark:text-[#777777]">
          {`${user.followers.length} followers`}
        </p>
      ) : null}
      {canEditProfile ? (
        <Button
          variant="outline"
          className="h-[34px] w-full rounded-xl text-[15px] font-semibold text-okei-primary"
          onClick={() => onOpen("editProfile", { user })}
        >
          Edit profile
        </Button>
      ) : (
        <Button
          variant="outline"
          className="h-[34px] w-full rounded-xl text-[15px] font-semibold text-okei-primary"
          onClick={(e) => {
            e.preventDefault();
            onFollow(user.id);
          }}
          disabled={isLoading}
        >
          {hasFollowed ? "Unfollow" : "Follow"}
        </Button>
      )}
    </div>
  );
};
