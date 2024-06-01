import { Header } from "@/components/header";

import { currentUser } from "@/lib/auth";

const SiteLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  return (
    <div className="mx-auto max-w-[1230px]">
      <Header user={user} />
      <div className="mx-auto max-w-[620px] pb-20 pt-[60px] md:pb-0 md:pt-[74px]">
        {children}
      </div>
    </div>
  );
};

export default SiteLayout;
