"use client";

import { ModalWrapper } from "@/components/modals/modal-wrapper";

type CommentPostModalProps = {};

export const CommentPostModal = ({}: CommentPostModalProps) => {
  return (
    <ModalWrapper
      open={false}
      onOpenChange={() => {}}
      title="Reply"
      className="h-min md:max-h-[90%]"
    >
      <div className="overflow-y-auto px-8 py-6">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque,
          eum unde. Debitis eius amet tempore qui deserunt laborum assumenda
          voluptatibus. Ab fuga itaque dicta placeat minus natus. Ab maxime
          dolores necessitatibus modi deleniti, omnis distinctio maiores alias
          aut magni ex temporibus accusantium, corrupti magnam assumenda ipsa
          quos esse debitis odio eveniet facere sint nihil? Tempora a delectus,
          neque animi suscipit error reiciendis est labore debitis? Tenetur
          minima, aperiam pariatur quis ab a. Sequi exercitationem velit
          deserunt similique nam. Veritatis cum soluta amet quos aliquid
          exercitationem iusto repellat labore quaerat incidunt odio nemo,
          quidem omnis voluptate est doloremque! Ea, cupiditate magni.
        </p>
      </div>
    </ModalWrapper>
  );
};
