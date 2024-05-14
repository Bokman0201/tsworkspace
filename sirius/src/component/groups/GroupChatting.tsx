import React, { useEffect, useRef, useState } from "react";
import './group.css';
import { IoIosSend } from "react-icons/io";


export const GroupChatting: React.FC = () => {
    const [memberList, setMemberList] = useState<string[]>([]);


    useEffect(() => {
        if (memberList.length > 1) {
            console.log(memberList)
        }
        else {
            for (let i = 1; i <= 90; i++) {
                memberList.push(String(i)); // 또는 memberList.push(i.toString());
            }
        }

    }, [])

    const [text, setText] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (text.length > 0) {
            event.preventDefault(); // 기본 제출 동작 방지
            // 여기에 폼이 제출될 때 수행할 작업을 추가할 수 있습니다.
            console.log('폼이 제출되었습니다:', text);
            setText('')
            moveBottom();
        }
    };

    const handleKeyPress = (event: any) => {
        if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault(); // 엔터 키 입력 시 기본 동작 방지
            const cursorPosition = event.currentTarget.selectionStart;
            setText(
                text.slice(0, cursorPosition) + '\n' + text.slice(cursorPosition)
            );
        }
        else if (event.key === "Enter") {
            event.preventDefault();    // ✅ 이 코드를 추가하여 엔터키를 방지한다.
            handleSubmit(event);
        }
    };


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
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [size, setSize] = useState<number>(0);

    const resizeListener = () => {
        setInnerHeight(window.innerHeight);
    };
    useEffect(() => {
        window.addEventListener("resize", resizeListener);
        console.log("innerHeight", innerHeight);

        let chattingRoomSize = innerHeight - 183;
        setSize(chattingRoomSize)
        return () => {
            window.removeEventListener("resize", resizeListener);
        };
    }, [innerHeight]); // 빈


    return (
        <div style={{ position: "relative", paddingBottom: "50px" }} className="scroll-container" > {/* 하위 div가 겹치지 않도록 padding-bottom 추가 */}
            <div className="row">
                <div className="col-lg-3 d-none d-lg-block" style={{ overflowX: 'auto', maxHeight: `${size}px` }}>
                    <div className="">
                        {memberList.map((str, ind) => (
                            <div key={ind}>{str}</div>
                        ))}
                    </div>
                </div>
                <div className="col-lg" style={{ overflowX: 'auto', maxHeight: `${size}px` }}>
                    <div ref={bottomRef} className="container">

                        <div className=" text-end">
                            {memberList.map((str, ind) => (
                                <div key={ind}>{str}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row-default w-100" style={{ position: 'fixed', bottom: "40px", left: "0", width: "100%", background: "white" }} >
                <div className="col-12 col-lg-6 offset-lg-3"> {/* 상단에 고정되고 하위 div와 겹치지 않도록 수정 */}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <textarea
                                className="form-control"
                                style={{ resize: 'none', height: 'auto', minHeight: '50px' }}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />

                            <button disabled={text.length > 0 ? false : true} className="btn btn-primary" type="submit">
                                <IoIosSend />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}