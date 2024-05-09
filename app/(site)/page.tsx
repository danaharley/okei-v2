import { Post } from "@/components/post/post";
import { PostInput } from "@/components/post/post-input";
import { Tab } from "@/components/tab";

const SitePage = () => {
  return (
    <div className="mx-auto max-w-[620px] pt-[60px] md:pt-[74px]">
      <PostInput />
      <Tab />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default SitePage;
