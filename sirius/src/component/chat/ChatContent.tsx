import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import './chat.css';
import { useClientId } from "../store/FriendStore";
import useClientInfo from "../store/UserStoer";
import { chatMessageType } from "../types/ChatType";
import { useNavigate } from "react-router-dom";


interface ChatContentProps {
  sendMessage: (message: chatMessageType) => void;
  messageList: chatMessageType[]
  setMessageList: Dispatch<SetStateAction<chatMessageType[]>>;

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
        roomNo: Number(roomNo),
        clientId: clientInfo.clientId,
        type: "enter",
        content: "enter room : " + roomNo + ", " + "client : " + clientInfo.clientId,
        date: null
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
      bottomRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100); // setTimeout으로 조정하여 스크롤 이벤트를 보장
    }
  }

  useEffect(() => {
    moveBottom();
  }, []);


  return (
    <div className="row w-100">
      <div className="col-lg-6 offset-lg-3 chat-container">
        <div className="message-list">
          {messageList.map((msg, ind) => {
            const isFirstInGroup = ind === 0 || messageList[ind - 1].clientId !== msg.clientId;
            const isLastInGroup = ind === messageList.length - 1 || messageList[ind + 1].clientId !== msg.clientId;

            return (
              <div key={ind} className={msg.clientId === clientInfo.clientId ? "text-end" : "text-start"}>
                {isFirstInGroup && clientInfo.clientId !== msg.clientId && <div className="row w-100">{msg.clientId}</div>}
                <div className="message">
                  <div className="col-12"><span>{msg.content}</span></div>
                </div>
                {isLastInGroup && <div className="col"><span style={{ fontSize: "11px" }}>{msg.date}</span></div>}
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