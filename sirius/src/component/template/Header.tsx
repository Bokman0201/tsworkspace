import React, { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from "react";
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
import { chatRoomType } from "../store/ChatStore";

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


    const [chatRoomData, setChatRoomData] = useState<chatRoomType>({
        chatRoomNo: 0,
        chatClientId: "",
        chatType: "",
        chatRoomName: "",
        chatMembersCount: 0,
    }
    );


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
                setTitle(chatRoomData.chatRoomName);
                break;
            default:
                setTitle("다른 페이지");
                break;
        }
    }, [location.pathname, chatRoomData]);


    const [prevPath, setPrevPath] = useState(location.pathname);

    useLayoutEffect(() => {

        if (prevPath === "/chatRoom" && location.pathname !== "/chatRoom") {
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
            setMessageList([]);
            sessionStorage.removeItem("roomNo")
            setChatRoomData({        chatRoomNo: 0,
                chatClientId: "",
                chatType: "",
                chatRoomName: "",
                chatMembersCount: 0,})
        }
        setPrevPath(location.pathname);
    }, [location.pathname, prevPath]);


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


 


    // const fetchChatRoomName = async () => {
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_REST_API_URL}/chat/getChatRoomName/${roomNoStr}`);
    //         setChatRoomName(response.data);
    //         if (response.data === "") {

    //             setChatMembers("몰라")
    //         }
    //     } catch (error) {
    //         console.error('Error fetching chat room name:', error);
    //     }
    // };

    // fetchChatRoomName();
    useEffect(() => {
        console.log(" data",chatRoomData)
        if(location.pathname === "/chatRoom")
        getChatRoomData()
    }, [location]);

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const getChatRoomData = async () => {
        console.log(roomNoStr)
        const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/chat/getRoomData/${roomNoStr}/${clientInfo.clientId}`)
        console.log(res.data)
        setChatRoomData(res.data)
    }


    return (
        <header>
            <h3>{title} {location.pathname === "/chatRoom" && (
                <>
                    <IoIosSettings style={{ cursor: "pointer" }} onClick={() => setModalIsOpen(true)} />
                    <HeaderModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
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
                <></>
            )}
            {title === '그룹' && (
                <CiSquarePlus style={{ cursor: "pointer" }} size="40" color="#555" onClick={controlModal} />
            )}
            {location.pathname === '/chatRoom' && (
                // split으로 자르고 뒷부분 사용하기
                <div onClick={moveBack}>
                    <IoIosArrowBack />
                    {sessionStorage.getItem("roomNo")}
                </div>
            )}
            {title === '친구목록' && (
                <div className="ms">
                    <div className="input-group">
                        {isClick && (<ClientSearchInput setIsHeaderClick={setIsClick} />)}
                        <button onClick={handleSearchButton} className="btn btn-sm btn-outline-primary">
                            {isClick ? (<span>닫기</span>) : (<span>친구찾기</span>)}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
