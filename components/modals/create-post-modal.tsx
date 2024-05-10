import { ModalWrapper } from "@/components/modals/modal-wrapper";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";

import { useModalStore } from "@/hooks/use-modal-store";

export const CreatePostModal = () => {
  const { isOpen, type, onClose } = useModalStore();

  const isModalOpen = isOpen && type === "createPost";

  const onModalClose = () => {
    onClose();
  };

  return (
    <ModalWrapper
      open={isModalOpen}
      onOpenChange={onModalClose}
      title="New post"
    >
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center">
          <UserAvatar
            src="https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_500,h_500,c_thumb,g_faces,z_0.75/v1692813203/danaharley/dana-harli.jpg"
            alt="profile"
          />
          <p className="font-medium text-okei-primary">danaharliansyah</p>
        </div>
        <p>conten here</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
          rerum incidunt possimus voluptate ipsam pariatur facere a eos sint
          fugit veniam, ab omnis quisquam nisi! Aspernatur exercitationem
          ducimus quia maiores. A rerum saepe nemo quo porro, optio doloremque!
          Reiciendis sequi quae temporibus adipisci reprehenderit sint harum
          tenetur. Nostrum, officia natus?
        </p>
      </div>

      <div className="ml-auto">
        <Button className="ml-auto h-9 rounded-3xl text-[15px]">Post</Button>
      </div>
    </ModalWrapper>
  );
};
