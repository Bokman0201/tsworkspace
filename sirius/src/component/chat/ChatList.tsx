import { useEffect, useState } from "react";

export const ChatList = () => {

    const [memberList, setMemberList] = useState<string[]>([]);


    useEffect(() => {
        console.log("hi")
        for (let i = 1; i <= 10; i++) {
            memberList.push(String(i)); // 또는 memberList.push(i.toString());
        }
    }, [])

    return (
        <div className="">
            {memberList.map((str, ind) => (
                <div key={ind}>{str}</div>
            ))}
        </div>
    );
}