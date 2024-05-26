"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const Tab = () => {
  const pathname = usePathname();

  return (
    <div className="grid h-12 grid-cols-2 text-[15px] font-medium text-okei-secondary sm:hidden">
      <Link
        href="/"
        className={cn(
          "flex h-full w-full items-center justify-center border-b border-b-okei-secondary/30",
          pathname !== "/following" && "border-b-okei-primary",
        )}
      >
        For you
      </Link>
      <Link
        href="#"
        className={cn(
          "flex h-full w-full items-center justify-center border-b border-b-okei-secondary/30",
          pathname === "/following" && "border-b-okei-primary",
        )}
      >
        Following
      </Link>
    </div>
  );
};
