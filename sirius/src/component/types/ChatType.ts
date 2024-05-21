//방번호 내아이디 내용 시간 메세지 타입
export interface chatMessageType {
    roomNo: number
    clientId:string,
    content:string,
    type:string
    date:string|null
}