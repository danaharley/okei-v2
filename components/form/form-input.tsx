import * as React from "react";

import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form/form-error";

import { cn } from "@/lib/utils";

type FormInputProps = {
  id: string;
  fieldErrors?: Record<string, string[] | undefined>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, fieldErrors, className, type = "text", ...props }, ref) => {
    return (
      <>
        <Input
          ref={ref}
          type={type}
          className={cn(
            "h-full w-full rounded-xl border-transparent bg-okei-foreground p-4 text-[15px] text-okei-primary placeholder:font-light placeholder:text-okei-secondary focus-visible:border focus-visible:border-okei-secondary/60 focus-visible:ring-0 focus-visible:ring-offset-0",
            className,
          )}
          {...props}
        />
        <FormError id={id} fieldErrors={fieldErrors} />
      </>
    );
  },
);

FormInput.displayName = "FormInput";

export { FormInput };
