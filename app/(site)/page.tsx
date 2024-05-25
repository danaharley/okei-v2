import { Post } from "@/components/post/post";
import { PostInput } from "@/components/post/post-input";
import { Tab } from "@/components/tab";

import { currentUser } from "@/lib/auth";
import { getAllposts } from "@/lib/post";

const SitePage = async () => {
  const user = await currentUser();

  const posts = await getAllposts();

  return (
    <div className="mx-auto max-w-[620px] pb-20 pt-[60px] md:pb-0 md:pt-[74px]">
      <PostInput />
      <Tab />
      {posts && posts.length ? (
        <Post user={user} posts={posts} />
      ) : (
        <div className="p-8 text-center">
          <p className="font-semibold">No Posts.</p>
        </div>
      )}
    </div>
  );
};

export default SitePage;
