import { create } from 'zustand';

interface ClientIdType {
    clientId: string;
}

interface ClientIdAction {
    setClientId: (clientId: string) => void;
    deleteClientId: () => void;
}

export const useClientId = create<ClientIdType & ClientIdAction>((set) => ({
    clientId: '',
    setClientId: (clientId: string) => set({ clientId }),
    deleteClientId: () => set({ clientId: '' }),
}));
