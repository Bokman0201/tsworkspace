import { type } from "os";

export type Client = {
    clientEmail: string,
    clientName: string,
    clientPw: string,
    clientPwCheck: string
}
export type ClientInfoResult ={
    clientEmailResult:null|boolean,
    clientNameResult:null|boolean,
    clientPwResult:null|boolean,
    clientPwCheckResult:null|boolean,
}

export type LoginInfo = {
    loginId : string,
    loginPw : string
}

export type ClientType = {
    clientEmail: string | null,
    clientName: string | null,
    clientJoinDate:string | null
}