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

const RegisterSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name is required",
    })
    .min(3, { message: "Name must be more than 3 characters" }),
  email: z.string().email({
    message: "This field has to be filled.",
  }),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username is required",
    })
    .min(1, { message: "Username must be more than 3 characters" })
    .toLowerCase()
    .transform((value) => value.replace(/\s+/g, "")),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

type FormSchemaType = z.output<typeof RegisterSchema>;

export const RegisterForm = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Name"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Email"
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Username"
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
        <SubmitForm className="h-full w-full rounded-xl p-4">
          Sign up
        </SubmitForm>
      </form>
    </Form>
  );
};
