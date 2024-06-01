import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ModalWrapper } from "@/components/modals/modal-wrapper";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/user-avatar";
import { FormSubmit } from "@/components/form/form-submit";
import { ImageUpload } from "@/components/image-upload";

import { useAction } from "@/hooks/use-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore } from "@/hooks/use-modal-store";

import { EditProfileSchema } from "@/actions/profile/edit/schema";
import { editProfile } from "@/actions/profile/edit";

import { siteConfig } from "@/config/site";

type FormSchemaType = z.output<typeof EditProfileSchema>;

export const EditProfileModal = () => {
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === "editProfile";

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: data.user?.name || undefined,
      email: data.user?.email || undefined,
      username: data.user?.username || undefined,
      image: data.user?.image || undefined,
    },
  });

  const { execute, isLoading } = useAction(editProfile, {
    onSuccess: () => {
      toast.success("Profile updated.");
      onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  React.useEffect(() => {
    if (data && data.user) {
      form.setValue("name", data.user.name!);
      form.setValue("email", data.user.email!);
      form.setValue("username", data.user.username!);
      form.setValue(
        "image",
        data.user.image ? data.user.image : siteConfig.image.url,
      );
    }
  }, [data, form]);

  const onModalClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<FormSchemaType> = (e) => {
    execute({
      name: e.name,
      email: e.email,
      username: e.username,
      image: e.image,
    });
  };

  return (
    <ModalWrapper
      open={isModalOpen}
      onOpenChange={onModalClose}
      title="Edit profile"
      className="h-full max-w-xl p-4 md:h-min md:max-h-[90%]"
    >
      <div className="h-full px-2 py-4 md:p-4">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
            }}
            className="flex h-full flex-col space-y-6"
          >
            <div className="flex items-center space-x-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full space-y-0">
                    <FormLabel className="text-[15px] font-semibold text-okei-primary">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        className="rounded-none border-b border-l-0 border-r-0 border-t-0 border-b-okei-secondary/30 p-0 text-[15px] placeholder:text-okei-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
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
                name="image"
                render={({ field }) => (
                  <FormItem className="group relative space-y-0">
                    <FormControl>
                      <UserAvatar
                        src={field.value ? field.value : siteConfig.image.url}
                        alt="profile"
                        className="mr-0 h-14 w-14"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <div className="absolute inset-0 h-full w-full group-hover:cursor-pointer">
                      <ImageUpload onChange={field.onChange} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormLabel className="text-[15px] font-semibold text-okei-primary">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      className="rounded-none border-b border-l-0 border-r-0 border-t-0 border-b-okei-secondary/30 p-0 text-[15px] placeholder:text-okei-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
                      disabled
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
                <FormItem className="w-full space-y-0">
                  <FormLabel className="text-[15px] font-semibold text-okei-primary">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      className="rounded-none border-b border-l-0 border-r-0 border-t-0 border-b-okei-secondary/30 p-0 text-[15px] placeholder:text-okei-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSubmit
              className="!mt-auto h-[52px] rounded-xl bg-okei-primary text-[15px] font-semibold text-secondary md:!mt-10"
              disabled={isLoading}
            >
              {isLoading ? "Updating" : "Update"}
            </FormSubmit>
          </form>
        </Form>
      </div>
    </ModalWrapper>
  );
};
