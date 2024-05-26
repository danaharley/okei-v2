import { Header } from "@/components/header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-[1230px]">
      <Header />
      <div className="mx-auto max-w-[620px] pb-20 pt-[60px] md:pb-0 md:pt-[74px]">
        {children}
      </div>
    </div>
  );
};

export default SiteLayout;
