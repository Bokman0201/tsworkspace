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
import { chatMessageType } from "../types/ChatType";
import useClientInfo from "../store/UserStoer";

interface HeaderProps {
    sendMessage: (message: chatMessageType) => void;
    setMessageList: Dispatch<SetStateAction<chatMessageType[]>>;
}

export const Header: React.FC<HeaderProps> = ({ sendMessage,setMessageList }) => {
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
                setTitle("님과의 대화");
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
                type: "exit",
                content: "퇴장",
                clientId: clientInfo.clientId,
                roomNo: Number(roomNoStr),
                date:null

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

    return (
        <header>
            <h3>{title}</h3>
            {title === "홈" && (
                <div className="me-3">
                    <span onClick={moveInviteList}><InviteListIcon /></span>
                </div>
            )}
            {title === "채팅" && (
                <AddChat />
            )}
            {title === '친구요청' && (
                <div className="input-group ms-2">
                    {isClick && (<ClientSearchInput setIsHeaderClick={setIsClick} />)}
                    <button onClick={handleSearchButton} className="btn btn-sm btn-outline-primary">
                        {isClick ? (<span>닫기</span>) : (<span>친구찾기</span>)}
                    </button>
                </div>
            )}
            {title === '그룹' && (
                <CiSquarePlus style={{ cursor: "pointer" }} size="40" color="#555" onClick={controlModal} />
            )}
            {title === '님과의 대화' && (
                // split으로 자르고 뒷부분 사용하기
                <div onClick={moveBack}>
                    {roomNoStr}<IoIosArrowBack />
                </div>
            )}
        </header>
    );
}
