import Link from "next/link";

export const Tab = () => {
  return (
    <div className="grid h-12 grid-cols-2 border-b border-b-okei-secondary/30 text-[15px] font-medium text-okei-secondary sm:hidden">
      <Link href="/" className="flex h-full w-full items-center justify-center">
        For you
      </Link>
      <Link
        href="/following"
        className="flex h-full w-full items-center justify-center"
      >
        Following
      </Link>
    </div>
  );
};
