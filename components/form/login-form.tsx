"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { ZodType, z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitForm } from "@/components/form/submit-form";

import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema: ZodType = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username is required",
    })
    .min(2, { message: "Username must be more than 2 characters" })
    .email("This is not a valid email."),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password is required",
  }),
});

type FormSchemaType = z.output<typeof LoginSchema>;

export const LoginForm = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (e) => {
    console.log(e);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Username, phone, or email"
                  className="h-full w-full rounded-xl border-transparent bg-okei-foreground p-4 text-[15px] text-okei-primary placeholder:font-light placeholder:text-okei-secondary focus-visible:border focus-visible:border-okei-secondary/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="h-full w-full rounded-xl border-transparent bg-okei-foreground p-4 text-[15px] text-okei-primary placeholder:font-light placeholder:text-okei-secondary focus-visible:border focus-visible:border-okei-secondary/60 focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitForm className="h-full w-full rounded-xl p-4">Log in</SubmitForm>
      </form>
    </Form>
  );
};
