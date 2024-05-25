import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import './chat.css';
import { useClientId } from "../store/FriendStore";
import useClientInfo from "../store/UserStoer";
import { chatMessageType, messageType } from "../types/ChatType";
import { useNavigate } from "react-router-dom";
import { ProfileImg } from "../client/img/ProfileImg";
import axios from "axios";


interface ChatContentProps {
  sendMessage: (message: messageType) => void;
  messageList: messageType[]
  setMessageList: Dispatch<SetStateAction<messageType[]>>;

}

export const ChatContent: React.FC<ChatContentProps> = ({ sendMessage, messageList ,setMessageList}) => {
  const { clientInfo } = useClientInfo();

  const navigator = useNavigate();

  const roomNo = sessionStorage.getItem("roomNo")



  useEffect(() => {

    if (clientInfo.clientId === "") {
      navigator("/friend");
      
    }
    //소켓으로 
    if (clientInfo.clientId !== "") {
      const data = {
        chatMessageNo :  null,
        chatRoomNo: Number(roomNo),
        chatClientId: clientInfo.clientId,
        chatContent:  "enter room : " + roomNo + ", " + "client : " + clientInfo.clientId,
        chatFiles:null,
        chatTime: null,
        chatReadStatus:null,
        type: "enter",
      }
      sendMessage(data)
    }
    //소켓으로 연결

    //roomNo의 방에 대한 정보가져오기
  }, [roomNo, clientInfo.clientId])

  useEffect(() => {

  }, [])

  const bottomRef = useRef<HTMLDivElement>(null);

  const moveBottom = () => {

    // if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //     console.log("x")
    //     return;
    // }
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'nearest' });
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      },30); // setTimeout으로 조정하여 스크롤 이벤트를 보장
    }
  }

  useEffect(() => {
    moveBottom();
    getMessageList();
  }, []);

  const getMessageList = async()=>{
    try{
      const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/chat/messageList/${roomNo}`)
      const reverseList = res.data.reverse();
      setMessageList(res.data)
    }catch (e) {
      console.error(e)
    } 
  }


  return (
    <div className="row w-100">
      <div className="col-lg-6 offset-lg-3 chat-container">
        <div className="message-list">
          {messageList.map((msg, ind) => {
            const isFirstInGroup = ind === 0 || messageList[ind - 1].chatClientId !== msg.chatClientId;
            const isLastInGroup = ind === messageList.length - 1 || messageList[ind + 1].chatClientId !== msg.chatClientId;

            return (
              <div key={ind} className={msg.chatClientId === clientInfo.clientId ? "text-end" : "text-start"}>
                {isFirstInGroup && clientInfo.clientId !== msg.chatClientId && 
                <div className="row w-100">
                <div className="col">{msg.chatClientId}</div>
                </div>
                }
                <div className="message">
                  <div className="col-12"><pre>{msg.chatContent}</pre></div>
                </div>
                {isLastInGroup && <div className="col"><span style={{ fontSize: "11px" }}>{msg.chatTime}</span></div>}
              </div>
            );
          })}
        </div>
        <div ref={bottomRef} />
      </div>
      <div className="message-input-container ">
        <ChatInput moveBottom={moveBottom} sendMessage={sendMessage} />
      </div>
    </div>
  );
}