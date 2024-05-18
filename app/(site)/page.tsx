import { Post } from "@/components/post/post";
import { PostInput } from "@/components/post/post-input";
import { Tab } from "@/components/tab";

import { db } from "@/lib/db";

const SitePage = async () => {
  const posts = await db.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-[620px] pb-20 pt-[60px] md:pb-0 md:pt-[74px]">
      <PostInput />
      <Tab />
      <Post posts={posts} />
    </div>
  );
};

export default SitePage;
