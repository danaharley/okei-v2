import { cn } from "@/lib/utils";
import Link from "next/link";

type MainVavProps = {
  routes: {
    label: string;
    href: string;
    active: boolean;
    icon: any;
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
              className="m-0.5 flex w-full items-center justify-center rounded-lg py-5 hover:bg-okei-foreground"
            >
              <span className="sr-only">{route.label}</span>
              {route.icon}
            </Link>
          ))}
        </li>
      </ul>
    </nav>
  );
};
