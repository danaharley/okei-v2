import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

type UserAvatarProps = React.ImgHTMLAttributes<HTMLImageElement>;

const UserAvatar = React.forwardRef<HTMLImageElement, UserAvatarProps>(
  ({ className, alt, src, ...props }, ref) => {
    return (
      <Avatar className={cn("mr-2.5 h-9 w-9", className)}>
        <AvatarImage
          ref={ref}
          src={src}
          alt={alt}
          {...props}
          className="object-cover"
        />
        <AvatarFallback className="z-10" />
      </Avatar>
    );
  },
);

UserAvatar.displayName = "UserAvatar";

export { UserAvatar };
