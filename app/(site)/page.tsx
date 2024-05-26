import { Post } from "@/components/post/post";
import { PostInput } from "@/components/post/post-input";
import { Tab } from "@/components/tab";
import { Button } from "@/components/ui/button";

import { currentUser } from "@/lib/auth";
import { getAllPosts } from "@/lib/post";

const SitePage = async () => {
  const user = await currentUser();

  const posts = await getAllPosts();

  return (
    <>
      <PostInput />
      <Tab />
      {posts && posts.length ? (
        <Post user={user} posts={posts} />
      ) : (
        <div className="p-8 text-center">
          <p className="font-semibold">No Posts.</p>
        </div>
      )}
    </>
  );
};

export default SitePage;
