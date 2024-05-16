import { create } from 'zustand'
// 상태 인터페이스 정의
interface modalStatus {
    status: boolean;
}

// 액션 인터페이스 정의
interface modalAction {
    setStatus: (status: boolean) => void;
    deleteStatus: () => void;
}

// Zustand 상태 훅 생성
export const useModalStatus = create<modalStatus & modalAction>((set) => ({
    status: false,
    setStatus: (status: boolean) => set({ status }),
    deleteStatus: () => set({ status: false }),
}));