import {create } from 'zustand';
import { ClientType } from '../../model/client';

export const useClientStore = create<ClientType>((set) => ({
    clientEmail: '',
    clientName: '',
    clientJoinDate: '',
    setClientEmail: (email: string) => set({ clientEmail: email }),
    setClientName: (name: string) => set({ clientName: name }),
    setClientJoinDate: (joinDate: string) => set({ clientJoinDate: joinDate }),
  }));