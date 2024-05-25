import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClientSearchInput } from "./ClientSearchInput";
import { AddChat } from "../chat/AddChat";
import './Header.css';
import { FaBell } from "react-icons/fa";
import { InviteListIcon } from "../client/invite/InviteListIcon";
import { CiSquarePlus } from "react-icons/ci";
import { useModalStatus } from "../store/ModalStore";
import { IoIosArrowBack } from "react-icons/io";
import { chatMessageType, messageType } from "../types/ChatType";
import useClientInfo from "../store/UserStoer";
import axios from "axios";
import { debug } from "console";
import { IoIosSettings } from "react-icons/io";
import { HeaderModal } from "./HeaderModal";

interface HeaderProps {
    sendMessage: (message: messageType) => void;
    setMessageList: Dispatch<SetStateAction<messageType[]>>;
}

export const Header: React.FC<HeaderProps> = ({ sendMessage, setMessageList }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>();
    const roomNoStr = sessionStorage.getItem('roomNo')
    const { clientInfo } = useClientInfo();

    useEffect(() => {
        switch (location.pathname.split('/')[1]) {
            case 'mypage':
                setTitle("내정보");
                break;
            case 'group':
                setTitle("그룹");
                break;
            case 'friend':
                setTitle("친구목록");
                break;
            case '':
                setTitle("홈");
                break;
            case 'chat':
                setTitle("채팅");
                break;
            case 'inviteList':
                setTitle("친구요청");
                break;
            case 'chatRoom':
                setTitle((chatRoomName !== '' ? chatRoomName : chatMembers + ' 님과의 대화'));
                break;
            default:
                setTitle("다른 페이지");
                break;
        }
    }, [location.pathname]);
    useEffect(() => {
        if (location.pathname !== "/chatRoom") {
            console.log("try");
            const data = {
                chatMessageNo: null,
                chatRoomNo: Number(roomNoStr),
                chatClientId: clientInfo.clientId,
                chatContent: "퇴장",
                chatTime: null,
                chatFiles: null,
                chatReadStatus: null,
                type: "exit",
            };
            sendMessage(data);
            setMessageList([])
        }
    }, [location.pathname]); // 의존성 배열에 location.pathname 추가


    const [isClick, setIsClick] = useState<boolean>(false);
    const handleSearchButton = () => {
        setIsClick(!isClick);
    }

    const moveInviteList = () => {
        navigate('/inviteList');
    }

    const { status, setStatus } = useModalStatus();

    const controlModal = () => {
        setStatus(!status);
    }

    const moveBack = () => {
        navigate(-1)
    }


    const [chatRoomName, setChatRoomName] = useState('');
    const [chatMembers, setChatMembers] = useState("");


    useEffect(() => {
        const fetchChatRoomName = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_REST_API_URL}/chat/getChatRoomName/${roomNoStr}`);
                setChatRoomName(response.data);
                if (response.data === "") {
                    //여기서 나열하기 이름
                    setChatMembers("몰라")
                }
            } catch (error) {
                console.error('Error fetching chat room name:', error);
            }
        };

        fetchChatRoomName();
    }, [roomNoStr]);

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);


    return (
        <header>
            <h3>{title} {location.pathname === "/chatRoom" && (
                <>
                    <IoIosSettings style={{ cursor: "pointer" }} onClick={()=>setModalIsOpen(true)}/>
                    <HeaderModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
                </>
            )}</h3>
            {title === "홈" && (
                <div className="me-3">
                    <span onClick={moveInviteList}><InviteListIcon /></span>
                </div>
            )}
            {title === "채팅" && (
                <AddChat />
            )}
            {title === '친구요청' && (
                <div className="ms">
                    <div className="input-group">
                        {isClick && (<ClientSearchInput setIsHeaderClick={setIsClick} />)}
                        <button onClick={handleSearchButton} className="btn btn-sm btn-outline-primary">
                            {isClick ? (<span>닫기</span>) : (<span>친구찾기</span>)}
                        </button>
                    </div>
                </div>
            )}
            {title === '그룹' && (
                <CiSquarePlus style={{ cursor: "pointer" }} size="40" color="#555" onClick={controlModal} />
            )}
            {location.pathname === '/chatRoom' && (
                // split으로 자르고 뒷부분 사용하기
                <div onClick={moveBack}>
                    <IoIosArrowBack />
                </div>
            )}
        </header>
    );
}
