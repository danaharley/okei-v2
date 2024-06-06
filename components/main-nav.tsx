import Link from "next/link";

import { cn } from "@/lib/utils";

type MainVavProps = {
  routes: {
    label: string;
    href: string;
    active: boolean;
    icon: any;
    hasActivity?: boolean | null;
  }[];
  className: string;
};

export const MainVav = ({ routes, className }: MainVavProps) => {
  return (
    <nav className={cn(className)}>
      <ul className="md:mx-[70px]">
        <li className="m-1 grid grid-cols-5">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className="relative m-0.5 flex w-full items-center justify-center rounded-lg py-5 hover:bg-okei-foreground/80"
            >
              {route.label === "Notifications" && route.hasActivity ? (
                <div className="absolute top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
              ) : null}
              <span className="sr-only">{route.label}</span>
              {route.icon}
            </Link>
          ))}
        </li>
      </ul>
    </nav>
  );
};
