import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import './chat.css';

export const ChatContent = () => {
    const [messageList, setMeessageList] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]);


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
        <div className="row">
          <div className="col-lg-6 offset-lg-3 chat-container">
            <div className="message-list">
              {messageList.map((str, ind) => (
                <div key={ind} className="message">{str}</div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="message-input-container ">
              <ChatInput   moveBottom={moveBottom} />
            </div>
          </div>
        </div>
    );
}