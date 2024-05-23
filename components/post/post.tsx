import * as React from "react";

import { Separator } from "@/components/ui/separator";
import { PostContent } from "@/components/post/post-content";
import { PostInfo } from "@/components/post/post-info";

import { PostWithUserWithLikeWithUser, UserWithoutPassword } from "@/types";

type PostProps = {
  user: UserWithoutPassword;
  posts: PostWithUserWithLikeWithUser[];
};

export const Post = ({ user, posts }: PostProps) => {
  return (
    <>
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <div className="m-3 flex flex-col md:mx-0 md:my-3">
            <PostContent user={user} post={post} />
            <PostInfo likes={post.likes} />
          </div>
          <Separator />
        </React.Fragment>
      ))}
    </>
  );
};
