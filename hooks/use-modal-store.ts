import { create } from "zustand";

import { PostWithUserWithLike, UserSession } from "@/types";

type ModalType = "createPost" | "commentPost" | "editProfile";

type ModalData = {
  post?: PostWithUserWithLike;
  user?: UserSession;
};

type ModalStore = {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
