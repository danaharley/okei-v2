import * as React from "react";
import { redirect } from "next/navigation";

import { PostContainer } from "@/components/post/post-container";
import { PostInfo } from "@/components/post/post-info";
import { PostComment } from "@/components/post/post-comment";

import { getAllPosts, getPostById } from "@/lib/post";
import { currentUser } from "@/lib/auth";

// export const generateStaticParams = async () => {
//   const posts = (await getAllPosts()) || [];

//   if (!posts) return [];

//   return posts.map((post) => ({
//     postId: post.id,
//   }));
// };

const PostIdPage = async ({ params }: { params: { postId: string } }) => {
  const user = await currentUser();

  const post = await getPostById(params.postId);

  if (!post) {
    return redirect("/");
  }

  return (
    <>
      <div className="mx-3 mb-1.5 mt-3 flex flex-col md:mx-0">
        <PostContainer user={user} post={post} />
        <PostInfo likes={post.likes} comments={post.comments} />
      </div>
      <PostComment comments={post.comments} />
    </>
  );
};

export default PostIdPage;
