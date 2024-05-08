"use client";

import { ElementRef, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

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
import { useAction } from "@/hooks/use-action";

import { LoginSchema } from "@/actions/login/schema";
import { login } from "@/actions/login";

type FormSchemaType = z.output<typeof LoginSchema>;

export const FormLogin = () => {
  const formRef = useRef<ElementRef<"form">>(null);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, isLoading } = useAction(login, {
    onSuccess: () => {
      toast.success("Logged in successfully.");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmitAction = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    execute({ email, password });
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={onSubmitAction}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(() => {
            onSubmitAction(new FormData(formRef.current!));
          })(e);
        }}
        className="space-y-2"
      >
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitForm
          disabled={isLoading}
          className="h-full w-full rounded-xl p-4"
        >
          Log in
        </SubmitForm>
      </form>
    </Form>
  );
};
