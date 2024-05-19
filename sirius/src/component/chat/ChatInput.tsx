import React, { useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import "./chat.css";

interface ChatInputProps {
    moveBottom: () => void;
}
export const ChatInput: React.FC<ChatInputProps> = ({ moveBottom }) => {
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

    return (
        <div className="chat-input-row">
            <div className="chat-input-col">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <textarea
                            className="form-control"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyPress}
                            style={{ resize: 'none', height: 'auto', minHeight: '50px' }}
                        />
                        <button
                            disabled={text.length === 0}
                            className="input-button"
                            type="submit"
                        >
                            <IoIosSend />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}