import { create } from "zustand";

interface sizeStroe {
    size:number
}

interface sizeAction {
    setSize: (status: number) => void;
    deleteSize: () => void;
}

export const useSizeStore = create<sizeStroe & sizeAction>((set) => ({
    size: 1000,
    setSize: (size: number) => set({ size }),
    deleteSize: () => set({ size: 1000 }),
}));