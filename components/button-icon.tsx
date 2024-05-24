import React from "react";

import { type VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export type ButtonIconProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon: any;
    iconStyle?: string;
  };

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  (
    {
      className,
      variant = "outline",
      size,
      title,
      icon: Icon,
      iconStyle,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="group flex items-center">
        <Button
          variant={variant}
          size={size}
          className={cn("text-okei-primary", className)}
          {...props}
          ref={ref}
        >
          <Icon className={cn("h-4 w-4", iconStyle)} />
          {title}
        </Button>
      </div>
    );
  },
);

ButtonIcon.displayName = "ButtonIcon";

export { ButtonIcon };
