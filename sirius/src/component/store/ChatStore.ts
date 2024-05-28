import { create } from "zustand"

export type chatRoomType = {
    chatRoomNo:number,
    chatClientId:string,
    chatType:string,
    chatRoomName: string
    chatMembersCount:number
}

