import * as React from "react";

import { Separator } from "@/components/ui/separator";
import { PostContainer } from "@/components/post/post-container";
import { PostInfo } from "@/components/post/post-info";

import { PostWithUserWithLikeWithUser, UserSession } from "@/types";

type PostProps = {
  user: UserSession["user"];
  posts: PostWithUserWithLikeWithUser[];
};

export const Post = ({ user, posts }: PostProps) => {
  return (
    <>
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <div className="m-3 flex flex-col md:mx-0 md:my-3">
            <PostContainer user={user} post={post} />
            <PostInfo likes={post.likes} />
          </div>
          <Separator />
        </React.Fragment>
      ))}
    </>
  );
};
