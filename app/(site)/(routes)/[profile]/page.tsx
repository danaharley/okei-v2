import * as React from "react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { UserAvatar } from "@/components/user-avatar";
import { PostContainer } from "@/components/post/post-container";
import { PostInfo } from "@/components/post/post-info";

import { getPostsByUsername } from "@/lib/post";
import { currentUser } from "@/lib/auth";
import { getAllUsers, getUserByUsername } from "@/lib/user";

import { UserSession } from "@/types";

export const generateStaticParams = async () => {
  const users = await getAllUsers();

  if (!users) return;

  return users.map((user) => ({
    profile: user.username,
  }));
};

const ProfilePage = async ({ params }: { params: { profile: string } }) => {
  const user = await currentUser();
  const userParams = await getUserByUsername(params.profile);

  if (!user || !userParams) return;

  const posts = await getPostsByUsername(params.profile);

  let heroProfile;

  if (user.username === params.profile) {
    heroProfile = <HeroProfile user={user} />;
  } else {
    heroProfile = <HeroProfile user={userParams} />;
  }

  return (
    <>
      {heroProfile}
      <Separator className="bg-okei-secondary/30" />
      {posts && posts.length ? (
        posts.map((post) => (
          <React.Fragment key={post.id}>
            <Link href={`/${user.username}/post/${post.id}`}>
              <div className="mx-3 mb-1.5 mt-3 flex flex-col md:mx-0">
                <PostContainer user={user} post={post} />
                <PostInfo likes={post.likes} comments={post.comments} />
              </div>
            </Link>
            <Separator className="bg-okei-secondary/30" />
          </React.Fragment>
        ))
      ) : (
        <div className="p-8 text-center">
          <p className="font-semibold">No Posts.</p>
        </div>
      )}
    </>
  );
};

export default ProfilePage;

export const HeroProfile = ({ user }: { user: UserSession }) => {
  return (
    <div className="space-y-4 px-3 py-4 md:px-0 md:py-8">
      <div className="flex items-center justify-between">
        <div className="pr-3">
          <h1 className="text-2xl font-bold text-okei-primary">{user.name}</h1>
          <p className="text-[15px] font-normal">{user.username}</p>
        </div>
        <UserAvatar
          src={
            user.image
              ? user.image
              : "https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
          }
          alt={user.username || "profile"}
          className="mr-0 h-16 w-16 md:h-[84px] md:w-[84px]"
        />
      </div>
      {/* TODO:  */}
      {/* <p className="text-[15px] font-normal text-okei-primary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
          repellendus! Soluta ullam commodi nostrum maiores blanditiis. Iure
          eius molestiae beatae!
        </p>
        <p className="text-[15px] font-normal text-[#999999] dark:text-[#777777]">
          500K followers
        </p> */}
    </div>
  );
};
