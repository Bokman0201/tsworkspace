import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import "./chat.css";
import { chatMessageType, fileType, messageType } from "../types/ChatType";
import { useClientId } from "../store/FriendStore";
import useClientInfo from "../store/UserStoer";
import { AiOutlinePicture } from "react-icons/ai";

interface ChatInputProps {
    moveBottom: () => void;
}


interface ChatContentProps {
    sendMessage: (message: messageType) => void;
}




export const ChatInput: React.FC<ChatInputProps & ChatContentProps> = ({ moveBottom, sendMessage }) => {
    const [text, setText] = useState('');
    const [files, setFiles] = useState<fileType[] | null>(null);
    const roomNoStr = sessionStorage.getItem("roomNo")
    const { clientInfo } = useClientInfo();

    
    
      const handleSubmit = () => {
        const now = new Date();
    
        const roomNo = Number(roomNoStr);
        if (text.length > 0) {
          const data = {
            chatMessageNo: null,
            chatRoomNo: roomNo,
            chatClientId: clientInfo.clientId,
            chatContent: text,
            chatFiles: null,
            chatTime: `${now}`,
            chatReadStatus: null,
            type: "message",
          };
          sendMessage(data);
          setText('');
          moveBottom();
        }
    
        if (files !== null) {
          files.forEach(file => {
            const data = {
              chatMessageNo: null,
              chatRoomNo: roomNo,
              chatClientId: clientInfo.clientId,
              chatContent: '',
              chatFiles: files,
              chatTime: `${now}`,
              chatReadStatus: null,
              type: "file",
            };
            console.log(data);
    
            sendMessage(data);
          });
          setFiles(null);
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
            event.preventDefault();    //
            handleSubmit();
        }
    };

    const [isClick, setIsClick] = useState<boolean>(false);
    const [inputComponent, setInputComponent] = useState<string>("text");
    const togglefunction = () => {
        setText("")
        setIsClick(!isClick);
        if (isClick === false && inputComponent !== 'text') {
            setInputComponent('text')
        }
    }

    useEffect(() => {
        console.log(inputComponent)
    }, [inputComponent])

    const changeInput = (component: string) => {
        ; // 여기서 id를 확인할 수 있습니다.
        // 추가적으로 하고 싶은 작업을 여기에 작성하세요.
        setInputComponent(component)
        setIsClick(false)
    };

    useEffect(() => {
        console.log(files);
    }, [files])

    return (
        <div className="chat-input-row">
            <div className="chat-input-col">
                <div className="input-group">
                    <button className="btn btn-secondary" onClick={isClick ? (togglefunction) : (togglefunction)}>{isClick === false && inputComponent === 'text' ? ("+") : ("x")}</button>


                    {isClick ?
                        (
                            <div className="col">
                                <button className="" onClick={() => changeInput("pic")} >
                                    <AiOutlinePicture size={40} />
                                </button>
                            </div>
                        ) : (
                            <>
                                {inputComponent === 'text' && (
                                    <textarea
                                        className="form-control"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        style={{ resize: 'none', height: 'auto', minHeight: '50px' }}
                                    />
                                )}
                                {inputComponent === 'pic' && (
                                    <>
                                        <input type="file" className="form-control" 
                                            multiple
                                        />
                                    </>
                                )}

                            </>
                        )}
                    {(text.length > 0 || (files && files.length > 0)) && (
                        <button
                            disabled={text.length === 0 && (files === null || files.length === 0)}
                            className="input-button"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            <IoIosSend />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}