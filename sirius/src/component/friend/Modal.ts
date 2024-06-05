import { create } from "zustand";

interface modalStatus {
    ModalIsOpen : boolean
}

interface modalAction {
    setModalIsOpen: (status: boolean) => void;
    deleteModalIsOpen: () => void;
}

export const useModalStatus = create<modalStatus & modalAction>((set) => ({
    ModalIsOpen: false,
    setModalIsOpen: (ModalIsOpen: boolean) => set({ ModalIsOpen }),
    deleteModalIsOpen: () => set({ ModalIsOpen: false }),
}));
