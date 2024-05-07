"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { LogOut, Menu, Settings } from "lucide-react";

import { Logo } from "@/components/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { MainVav } from "@/components/main-nav";

import { cn } from "@/lib/utils";

import { logout } from "@/actions/logout";

export const Header = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        href: "/",
        active: pathname === "/",
        icon: (
          <Icons.home
            className={cn(
              "size-[26px] fill-transparent stroke-okei-header_icon",
              pathname === "/" && "fill-okei-primary stroke-okei-primary",
            )}
          />
        ),
      },
      {
        label: "Search",
        href: "/search",
        active: pathname === "/search",
        icon: (
          <Icons.search
            className={cn(
              "size-[26px] fill-[#b8b8b8] stroke-okei-header_icon",
              pathname === "/search" && "fill-okei-primary stroke-okei-primary",
            )}
          />
        ),
      },
      {
        label: "Create",
        href: "/create",
        active: pathname === "/create",
        icon: (
          <Icons.create
            className={cn(
              "size-[26px] fill-transparent stroke-okei-header_icon",
              pathname === "/create" && "fill-okei-primary stroke-okei-primary",
            )}
          />
        ),
      },
      {
        label: "Notifications",
        href: "/activity",
        active: pathname === "/activity",
        icon: (
          <Icons.love
            className={cn(
              "size-[26px] fill-transparent stroke-okei-header_icon",
              pathname === "/activity" &&
                "fill-okei-primary stroke-okei-primary",
            )}
          />
        ),
      },
      {
        label: "Profile",
        href: "/profile",
        active: pathname === "/profile",
        icon: (
          <Icons.profile
            className={cn(
              "size-[26px] fill-transparent stroke-okei-header_icon",
              pathname === "/profile" &&
                "fill-okei-primary stroke-okei-primary",
            )}
          />
        ),
      },
    ],
    [pathname],
  );

  const onClick = () => {
    logout();
  };

  return (
    <header className="fixed top-0 z-40 w-full max-w-[1230px]">
      <div className="grid h-[60px] grid-cols-3 bg-background md:h-[74px] md:grid-cols-[auto_620px_auto]">
        <Link
          href="/"
          className="col-start-2 place-self-center self-center md:col-start-1 md:ml-4 md:place-self-auto md:self-center xl:ml-0"
        >
          <Logo className="size-9" />
        </Link>
        <MainVav
          routes={routes}
          className="fixed bottom-0 w-full bg-background md:hidden"
        />
        <MainVav routes={routes} className="hidden md:block" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="place-self-end self-center p-4 hover:cursor-pointer ">
              <Menu className="text-okei-header_icon transition hover:text-okei-primary" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto" align="end" alignOffset={18}>
            <DropdownMenuItem className="hover:cursor-pointer">
              <Menu className="mr-2 h-4 w-4" />
              <span>Mode</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={onClick}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
