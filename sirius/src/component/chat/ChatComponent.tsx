import React, { useEffect, useRef, useState } from "react";
import './group.css';
import { IoIosSend } from "react-icons/io";
import { ChatList } from "../chat/ChatList";
import { ChatInput } from "../chat/ChatInput";
import { ChatContent } from "../chat/ChatContent";

interface GroupChattingProps {
    size: number
}

export const ChatComponent: React.FC<GroupChattingProps> = ({ size }) => {







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



    //화면 크기 구해서 대화내용페이지 동적으로 크기변경



    return (
        <div style={{ position: "relative", paddingBottom: "50px" }} className="scroll-container" > {/* 하위 div가 겹치지 않도록 padding-bottom 추가 */}
            <div className="row">
                <div className="col-lg-3 " style={{ overflowX: 'auto', maxHeight: `${size}px` }}>
                    <ChatList />
                </div>
                <div className="col-lg d-none d-lg-block" style={{ overflowX: 'auto', maxHeight: `${size}px` }}>
                    <div  className="container">
                        <ChatContent />
                    </div>
                </div>
            </div>

        </div>

    );
}