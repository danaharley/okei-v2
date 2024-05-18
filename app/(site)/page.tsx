import { Post } from "@/components/post/post";
import { PostInput } from "@/components/post/post-input";
import { Tab } from "@/components/tab";

const SitePage = () => {
  return (
    <div className="mx-auto max-w-[620px] pb-20 pt-[60px] md:pb-0 md:pt-[74px]">
      <PostInput />
      <Tab />
      <Post />
    </div>
  );
};

export default SitePage;
