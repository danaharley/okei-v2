import Link from "next/link";

import { UserInfoContainer } from "@/components/user-info-container";

import { getAllActivity } from "@/lib/activity";
import { currentUser } from "@/lib/auth";

import { siteConfig } from "@/config/site";

const ActivityPage = async () => {
  const user = await currentUser();

  if (!user || !user.id) {
    return;
  }

  const activities = await getAllActivity(user.id);

  if (!activities) {
    return (
      <div className="p-8 text-center">
        <p className="font-semibold">No Activity.</p>
      </div>
    );
  }

  return (
    <>
      {activities.map((activity) => (
        <Link
          href={
            activity.type === "LIKE" || activity.type === "COMMENT"
              ? `/${activity.receiver?.username}/post/${activity.postId}`
              : `/${activity.performer.username}`
          }
          key={activity.id}
        >
          <UserInfoContainer
            type={activity.type}
            userImage={
              activity.performer.image
                ? activity.performer.image
                : siteConfig.image.url
            }
            altimage={
              activity.performer.username
                ? activity.performer.username
                : "profile"
            }
            username={
              activity.performer.username ? activity.performer.username : "user"
            }
            content={activity.content ? activity.content : ""}
            date={activity.createdAt}
          />
        </Link>
      ))}
    </>
  );
};

export default ActivityPage;
