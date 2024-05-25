import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { ModalWrapper } from "@/components/modals/modal-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@/components/tiptap/editor";
import { FormSubmit } from "@/components/form/form-submit";
import { UserAvatar } from "@/components/user-avatar";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";

import { useModalStore } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/hooks/use-action";

import { createPost } from "@/actions/post/create";
import { CreatePostSchema } from "@/actions/post/create/schema";

type FormSchemaType = z.output<typeof CreatePostSchema>;

export const CreatePostModal = () => {
  const [alertModal, setAlertModal] = React.useState(false);

  const { isOpen, type, onClose } = useModalStore();

  const isModalOpen = isOpen && type === "createPost";

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      content: "",
    },
  });

  const { execute, isLoading } = useAction(createPost, {
    onSuccess: () => {
      toast.success("Posted.");
      onClose();
      form.reset();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onModalClose = () => {
    if (isModalOpen && form.getValues().content) {
      setAlertModal(true);
    } else {
      setAlertModal(false);
      onClose();
    }
  };

  const onDiscard = () => {
    setAlertModal(false);
    onClose();
    form.reset();
  };

  const onSubmit: SubmitHandler<FormSchemaType> = (e) => {
    execute({ content: e.content });
  };

  const disabled = isLoading || !form.getValues().content;

  return (
    <ModalWrapper
      open={isModalOpen}
      onOpenChange={onModalClose}
      title="New post"
    >
      <AlertModal
        open={alertModal}
        title="Discard post?"
        onCancel={() => setAlertModal(false)}
        onConfirm={() => onDiscard()}
      />
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }}
          className="relative flex h-full flex-col rounded-tl-2xl rounded-tr-2xl"
        >
          <div className="mx-6 flex h-14 shrink-0 items-center md:mt-6 md:h-16">
            <UserAvatar
              src="https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
              alt="profile"
            />
            <p className="font-medium text-okei-primary">danaharliansyah</p>
          </div>
          <Separator className="bg-okei-secondary/30" />
          <div className="mx-6 my-6 mb-32 overflow-y-auto md:mb-20">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor
                      content={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="fixed bottom-0 flex h-20 w-full items-center rounded-bl-2xl rounded-br-2xl bg-background">
            <FormSubmit
              disabled={disabled}
              className="ml-auto mr-6 rounded-3xl text-[15px]"
            >
              {isLoading ? "Publishing" : "Publish"}
            </FormSubmit>
          </div>
        </form>
      </Form>
    </ModalWrapper>
  );
};
