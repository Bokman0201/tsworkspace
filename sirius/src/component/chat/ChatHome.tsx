import { useEffect, useState } from "react";
import useClientInfo from "../store/UserStoer";
import { chatRoomType } from "../store/ChatStore";
import axios from "axios";

export const ChatHome = () => {


    const { clientInfo } = useClientInfo();
    const [roomList, setRoomList] = useState<chatRoomType[]>();

    const getRoomList = async () => {
        if (clientInfo.clientId) {
            const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/chat/roomList/${clientInfo.clientId}`)
            setRoomList(res.data);
            console.log(res.data)
        }
    }

    useEffect(() => {
        getRoomList();
    }, [clientInfo])

    return (
        <div className="row">
            {roomList !== undefined ? (
                <div className="col">
                    {roomList?.map((room, index) => (
                        <div key={index}>
                            {room.chatRoomNo}
                            {room.chatClientId}
                            {room.chatType}
                            {room.chatRoomName}
                            {room.chatMembersCount}
                        </div>
                    ))}
                </div>
            ) : (
                <>대화 없음</>
            )}
        </div>
    );
}