import * as React from "react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { PostContainer } from "@/components/post/post-container";
import { PostInfo } from "@/components/post/post-info";

import { PostWithUserWithLikeWithComment, UserSession } from "@/types";

type PostProps = {
  user: UserSession;
  posts: PostWithUserWithLikeWithComment[];
};

export const Post = ({ user, posts }: PostProps) => {
  return (
    <>
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <Link href={`/${user.username}/post/${post.id}`}>
            <div className="m-3 flex flex-col md:mx-0 md:my-3">
              <PostContainer user={user} post={post} />
              <PostInfo likes={post.likes} comments={post.comments} />
            </div>
          </Link>
          <Separator className="bg-okei-secondary/30" />
        </React.Fragment>
      ))}
    </>
  );
};
