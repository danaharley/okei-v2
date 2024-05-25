"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type FormSubmitProps = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};

export const FormSubmit = ({
  children,
  className,
  disabled,
  variant,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      className={cn(`disabled:cursor-not-allowed`, className)}
    >
      {children}
    </Button>
  );
};
