"use client";

import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitForm } from "@/components/form/submit-form";
// import { FormInput } from "@/components/form/form-input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/hooks/use-action";

import { RegisterSchema } from "@/actions/register/schema";

import { register } from "@/actions/register";

type FormSchemaType = z.output<typeof RegisterSchema>;

export const RegisterForm = () => {
  const router = useRouter();

  const formRef = useRef<ElementRef<"form">>(null);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const { execute } = useAction(register, {
    onSuccess: () => {
      toast.success("User created.");
      formRef.current?.reset();
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmitAction = (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    execute({ name, username, email, password });
  };

  return (
    <Form {...form}>
      <form
        className="space-y-2"
        ref={formRef}
        action={onSubmitAction}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(() => {
            onSubmitAction(new FormData(formRef.current!));
          })(e);
        }}
      >
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
                {/* <FormInput
                  id="name"
                  placeholder="Name"
                  fieldErrors={fieldErrors}
                  {...field}
                /> */}
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
                {/* <FormInput
                  id="email"
                  placeholder="Email"
                  fieldErrors={fieldErrors}
                  {...field}
                /> */}
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
                {/* <FormInput
                  id="username"
                  placeholder="Username"
                  fieldErrors={fieldErrors}
                  {...field}
                /> */}
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
                {/* <FormInput
                  id="password"
                  type="password"
                  placeholder="Password"
                  fieldErrors={fieldErrors}
                  {...field}
                /> */}
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
