import * as React from "react";

import { cn } from "@/lib/utils";

type FormErrorProps = {
  id: string;
  fieldErrors?: Record<string, string[] | undefined>;
} & React.HTMLAttributes<HTMLParagraphElement>;

const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, id, fieldErrors, ...props }, ref) => {
    if (!fieldErrors) return null;

    return (
      <>
        {fieldErrors?.[id]?.map((error) => (
          <p
            key={error}
            ref={ref}
            id={id}
            className={cn("text-sm font-medium text-destructive", className)}
            {...props}
          >
            {error}
          </p>
        ))}
      </>
    );
  },
);
FormError.displayName = "FormError";

export { FormError };
