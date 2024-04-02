import { atom } from "recoil";
import { Client } from "../model/ClientModel";

export const groupNoState = atom<number>({
    key: 'groupNoState',
    default: 0
});