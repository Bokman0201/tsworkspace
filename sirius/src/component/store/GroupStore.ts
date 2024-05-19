import { create } from "zustand";

interface groupNoState {
    groupNo: number
}

interface groupNoAction {
    setGroupNo: (groupNo: number) => void;
    deleteGroupNo: () => void;
}

export const UseGroupNo = create<groupNoState & groupNoAction>((set) => ({
    groupNo: 0,
    setGroupNo: (groupNo: number) => set({ groupNo }),
    deleteGroupNo: () => set({ groupNo: 0 })
}))
