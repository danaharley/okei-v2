import { currentUser } from "@/lib/auth";

const SitePage = async () => {
  const session = await currentUser();

  return (
    <div className="mx-auto max-w-[620px] pt-[60px] md:pt-[74px]">
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default SitePage;
