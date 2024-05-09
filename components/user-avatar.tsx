import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

type UserAvatarProps = {
  src: string;
  alt: string;
  className?: string;
};

export const UserAvatar = ({ src, alt, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("mr-2.5 h-9 w-9", className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="z-10" />
    </Avatar>
  );
};
