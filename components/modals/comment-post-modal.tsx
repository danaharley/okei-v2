import * as React from "react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ModalWrapper } from "@/components/modals/modal-wrapper";
import { PostContent } from "@/components/post/post-content";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormSubmit } from "@/components/form/form-submit";
import { AlertModal } from "@/components/modals/alert-modal";

import { useModalStore } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/hooks/use-action";

import { CreateCommentSchema } from "@/actions/comment/create/schema";
import { commentPost } from "@/actions/comment/create";

type FormSchemaType = z.output<typeof CreateCommentSchema>;

export const CommentPostModal = () => {
  const [alertModal, setAlertModal] = React.useState(false);

  const { isOpen, onClose, type, data } = useModalStore();

  const { post, user } = data;

  const isModalOpen = isOpen && type === "commentPost";

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      postId: "",
      content: "",
    },
  });

  React.useEffect(() => {
    if (data && data.post) {
      form.setValue("postId", data.post.id);
    }
  }, [data, form]);

  const { execute, isLoading } = useAction(commentPost, {
    onSuccess: () => {
      toast.success("Posted a comment.");
      onClose();
      form.reset();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const disabled = isLoading || !form.getValues().content;

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
    execute({ postId: e.postId, content: e.content });
  };

  return (
    <ModalWrapper
      open={isModalOpen}
      onOpenChange={onModalClose}
      title="Reply"
      className="h-full md:h-min md:max-h-[90%]"
    >
      <AlertModal
        open={alertModal}
        title="Discard comment?"
        onCancel={() => setAlertModal(false)}
        onConfirm={() => onDiscard()}
      />
      <div className="space-y-3 overflow-y-auto p-6">
        <PostContent
          username={post?.user.username!}
          userImage={post?.user.image!}
          postDate={post?.createdAt}
          postContent={post?.content}
          showSeparator={!!post?.content}
        />
        <PostContent username={user?.username!} userImage={user?.image!}>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)(e);
              }}
              className="flex flex-col"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder={`Reply to ${post?.user.username}...`}
                        className="ml-2 h-6 border-none p-0 text-[15px] placeholder:text-okei-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postId"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input
                        className="ml-2 hidden h-6 border-none p-0 text-[15px] placeholder:text-okei-secondary focus-visible:ring-0 focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="ml-auto mt-6">
                <FormSubmit
                  disabled={disabled}
                  className="rounded-3xl text-[15px]"
                >
                  {isLoading ? "Posting" : "Post"}
                </FormSubmit>
              </div>
            </form>
          </Form>
        </PostContent>
      </div>
    </ModalWrapper>
  );
};
