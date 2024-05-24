import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonIcon } from "@/components/button-icon";

import { cn } from "@/lib/utils";

type ActionMenuProps = {
  children: React.ReactNode;
  align: "start" | "center" | "end";
  alignOffset: number;
  icon: any;
  className?: string;
  iconStyle?: string;
};

export const ActionMenu = ({
  children,
  align,
  alignOffset,
  icon,
  className,
  iconStyle,
}: ActionMenuProps) => {
  return (
    <DropdownMenu>
      <div className={cn(className)}>
        <DropdownMenuTrigger asChild>
          <ButtonIcon
            size="icon"
            icon={icon}
            iconStyle={cn("text-okei-header_icon transition", iconStyle)}
            className="h-8 w-8 rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent
        className="w-auto"
        align={align}
        alignOffset={alignOffset}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
