import { Offcanvas } from 'react-bootstrap';
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

// 친구 detail페이지 열고 닫는 state

interface OffcanvasState {
    canvasIsOpen: boolean;
  }
  
  // Define the actions interface
  interface OffcanvasStateAction {
    setOffcanvasState: (canvasIsOpen: boolean) => void;
    deleteOffcanvasState: () => void;
  }
  
  // Combine both interfaces into one
  type State = OffcanvasState & OffcanvasStateAction;
  
  // Create the Zustand store
  export const useOffcanvasState = create<State>((set) => ({
    canvasIsOpen: false,
    setOffcanvasState: (canvasIsOpen: boolean) => set({ canvasIsOpen }),
    deleteOffcanvasState: () => set({ canvasIsOpen: false })
  }));