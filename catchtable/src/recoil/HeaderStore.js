import { atom } from "recoil";

export const isSearchState = atom({
    key:"isSearchState",
    default:false
})

export const searchKeyWordState = atom({
    key:"searchKeyWordState",
    default:''
})