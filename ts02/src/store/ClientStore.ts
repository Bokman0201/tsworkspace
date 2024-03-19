import { atom } from "recoil";
import { Client } from "../model/ClientModel";

export const clientState = atom<Client>({
    key: 'clientState',
    default: {
        clientEmail: '',
        clientName: '',
        clientNick: '',
        clientJoinDate: '',
        clientBirth: '',
        affiliationId: 0
    },
  });