import { Dog } from "lucide-react";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  return <Dog className={cn("h-4 w-4 text-okei-primary", className)} />;
};
