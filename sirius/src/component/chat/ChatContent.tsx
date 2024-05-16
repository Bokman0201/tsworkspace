import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";

export const ChatContent = () => {
    const [memberList, setMemberList] = useState<string[]>([]);


    useEffect(() => {
        for (let i = 1; i <= 100; i++) {
            memberList.push(String(i)); // 또는 memberList.push(i.toString());
        }

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
        <div className=" text-end" ref={bottomRef}>
            {memberList.map((str, ind) => (
                <div key={ind}>{str}</div>
            ))}

            <ChatInput moveBottom={moveBottom} />
        </div>
    );
}