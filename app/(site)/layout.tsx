import { Header } from "@/components/header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-[1230px]">
      <Header />
      {children}
    </div>
  );
};

export default SiteLayout;
