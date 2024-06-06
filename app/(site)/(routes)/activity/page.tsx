import { UserInfoContainer } from "@/components/user-info-container";

import { siteConfig } from "@/config/site";

const ActivityPage = async () => {
  const date = new Date("2024-06-02T18:09:43.509Z");

  return (
    <UserInfoContainer
      key={1}
      type="LIKE"
      userImage={siteConfig.image.url}
      altimage={"profile"}
      username={"dana"}
      content={""}
      date={date}
    />
  );
};

export default ActivityPage;
