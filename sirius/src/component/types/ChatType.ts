//방번호 내아이디 내용 시간 메세지 타입
export interface chatMessageType {
    roomNo: number
    clientId:string,
    content:string,
    type:string
    date:string|null
}

export type fileType = {
    name: string;
    type: string;
    size: number;
    lastModified: number;
    data: string;
  };

export interface messageType {
    chatMessageNo : number|null,
    chatRoomNo: number,
    chatClientId: string,
    chatContent: string,
    chatFiles :fileType[]|null,
    chatTime: string | null,
    chatReadStatus:string|null,
    type:string
}


/*
	chat_message_no int auto_increment primary key,
    chat_room_no INT REFERENCES chat_room(chat_room_no) ON DELETE CASCADE,
    chat_client_id VARCHAR(90) REFERENCES client(client_id) ON DELETE SET NULL,
    chat_content VARCHAR(4000) NOT NULL,
    chat_time datetime default current_timestamp(),
    chat_read_status CHAR(1) 
*/