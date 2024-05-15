import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { ModalWrapper } from "@/components/modals/modal-wrapper";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Editor } from "@/components/tiptap/editor";
import { SubmitForm } from "@/components/form/submit-form";
import { UserAvatar } from "@/components/user-avatar";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";

import { useModalStore } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";

const CreatePostSchema = z.object({
  content: z.string(),
});

type FormSchemaType = z.output<typeof CreatePostSchema>;

export const CreatePostModal = () => {
  const [alertModal, setAlertModal] = useState(false);

  const { isOpen, type, onClose } = useModalStore();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      content: "",
    },
  });

  const isModalOpen = isOpen && type === "createPost";

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
    console.log(e);
  };

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
          className="relative flex h-full flex-col"
        >
          <div className="mx-6 flex h-14 shrink-0 items-center md:mt-6 md:h-16">
            <UserAvatar
              src="https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
              alt="profile"
            />
            <p className="font-medium text-okei-primary">danaharliansyah</p>
          </div>
          <Separator className="bg-okei-secondary/30" />
          <div className="min-h- mx-6 my-6 mb-32 overflow-y-auto md:mb-20">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor content={field.value} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="fixed bottom-0 flex h-20 w-full items-center bg-background">
            <SubmitForm className="ml-auto mr-6 rounded-3xl text-[15px]">
              Publish
            </SubmitForm>
          </div>
        </form>
      </Form>
    </ModalWrapper>
  );
};
