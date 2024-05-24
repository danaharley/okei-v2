"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { LogOut, Menu, Moon, Search, Settings, Sun } from "lucide-react";

import { Logo } from "@/components/logo";
import { Icons } from "@/components/icons";
import { MainVav } from "@/components/main-nav";
import { ActionMenu } from "@/components/action-menu";
import { ButtonIcon } from "@/components/button-icon";

import { cn } from "@/lib/utils";

import { logout } from "@/actions/logout";

export const Header = () => {
  const pathname = usePathname();

  const { setTheme, theme } = useTheme();

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
          <Search
            className={cn(
              "size-[26px] stroke-okei-header_icon",
              pathname === "/search" && "stroke-okei-primary",
            )}
          />
        ),
      },
      // {
      //   label: "Search",
      //   href: "/search",
      //   active: pathname === "/search",
      //   icon: (
      //     <Icons.search
      //       className={cn(
      //         "size-[26px] fill-[#b8b8b8] stroke-okei-header_icon dark:fill-okei-header_icon",
      //         pathname === "/search" && "fill-okei-primary stroke-okei-primary",
      //       )}
      //     />
      //   ),
      // },
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
          className="col-start-2 cursor-default place-self-center self-center md:col-start-1 md:ml-4 md:place-self-auto md:self-center xl:ml-0"
        >
          <Logo className="size-9 hover:cursor-pointer" />
        </Link>
        <MainVav
          routes={routes}
          className="fixed bottom-0 w-full bg-background md:hidden"
        />
        <MainVav routes={routes} className="hidden md:block" />
        <ActionMenu
          align="end"
          alignOffset={8}
          icon={Menu}
          className="place-self-end self-center p-4 hover:cursor-pointer"
          iconStyle="group-hover:text-okei-primary h-5 w-5 text-sm"
        >
          <ButtonIcon
            icon={theme === "light" ? Moon : Sun}
            title={theme === "light" ? "Dark Mode" : "Light Mode"}
            className="h-full w-full justify-start border-none p-1.5"
            iconStyle="mr-2"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <ButtonIcon
            icon={Settings}
            title="Settings"
            className="h-full w-full justify-start border-none p-1.5"
            iconStyle="mr-2"
          />
          <ButtonIcon
            icon={LogOut}
            title="Logout"
            className="h-full w-full justify-start border-none p-1.5 text-destructive hover:text-destructive"
            iconStyle="mr-2 text-destructive"
            onClick={onClick}
          />
        </ActionMenu>
      </div>
    </header>
  );
};
