import { Fragment } from "react";
import { Dot, Ellipsis, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";
import { Icons } from "@/components/icons";
import { TimeAgo } from "@/components/time-ago";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { db } from "@/lib/db";

export const Post = async () => {
  const posts = await db.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      {posts.map((post) => (
        <Fragment key={post.id}>
          <div className="m-3 flex flex-col md:mx-0 md:my-3">
            <div className="flex">
              <div className="relative flex flex-col items-center">
                <div className="z-10 bg-background pb-2">
                  <UserAvatar
                    src={
                      post.user.image
                        ? post.user.image
                        : "https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
                    }
                    alt={post.user.username || "profile"}
                    className="mr-0"
                  />
                </div>
                <Separator
                  orientation="vertical"
                  className="absolute w-0.5 bg-okei-secondary/30"
                />
              </div>
              <div className="w-full">
                <div className="relative flex items-center">
                  <p className="ml-2 font-medium text-okei-primary">
                    {post.user.username}
                  </p>
                  <TimeAgo
                    timestamp={post.createdAt}
                    className="ml-2 text-okei-secondary"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute -top-0.5 right-0 ml-auto h-8 w-8 rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      >
                        <Ellipsis className="h-4 w-4 text-okei-secondary" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-auto"
                      align="end"
                      alignOffset={8}
                    >
                      <DropdownMenuItem className="hover:cursor-pointer">
                        <Trash className="mr-2 h-4 w-4 text-destructive" />
                        <span className="text-destructive">Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div
                  className="ml-2 whitespace-pre-line"
                  style={{ whiteSpace: "pre-line" }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <div className="-mb-1.5 flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Icons.love
                      className="h-6 w-6 fill-transparent stroke-okei-primary/85"
                      strokeW="2"
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Icons.reply
                      className="h-[22px] w-[22px] fill-transparent stroke-okei-primary/85"
                      strokeW="2"
                    />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-1.5 flex w-full items-center">
              <div className="mr-2 flex max-w-9 flex-row-reverse flex-wrap-reverse justify-center gap-0.5">
                <UserAvatar
                  src="https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
                  alt="profile"
                  className="mr-0 h-4 w-4"
                />
                <UserAvatar
                  src="https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
                  alt="profile"
                  className="mr-0 h-5 w-5"
                />
                <UserAvatar
                  src="https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
                  alt="profile"
                  className="mr-0 h-3 w-3"
                />
              </div>
              <span className="text-[15px] font-light text-okei-secondary">
                180 replies
              </span>
              <Dot className="mx-0.5 h-3 w-3 text-okei-secondary" />
              <span className="text-[15px] font-light text-okei-secondary">
                5,600 likes
              </span>
            </div>
          </div>
          <Separator />
        </Fragment>
      ))}
    </>
  );
};
