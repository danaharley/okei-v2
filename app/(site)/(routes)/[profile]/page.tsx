import * as React from "react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { PostContainer } from "@/components/post/post-container";
import { PostInfo } from "@/components/post/post-info";
import { HeroProfile } from "@/components/hero-profile";

import { getPostsByUsername } from "@/lib/post";
import { currentUser } from "@/lib/auth";
import { getAllUsers, getUserByUsername } from "@/lib/user";

export const generateStaticParams = async () => {
  const users = (await getAllUsers()) || [];

  if (!users) return [];

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
    heroProfile = (
      <HeroProfile user={user} editable={user.username === params.profile} />
    );
  } else {
    heroProfile = (
      <HeroProfile
        user={userParams}
        editable={user.username === params.profile}
      />
    );
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
