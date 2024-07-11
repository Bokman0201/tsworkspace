import { atom } from "recoil";

export const clientState = atom({
    key: 'clientState',
    default: {
        clientId: "",
        clientJoinDate:"",
        clientName:"",
        clientNick:"",
        clientPw:"",
        clientType:"",
        clientUpdateDate:""
    }
});