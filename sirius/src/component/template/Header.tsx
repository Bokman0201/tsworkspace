import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClientSearchInput } from "./ClientSearchInput";
import { AddChat } from "../chat/AddChat";
import './Header.css';
import { FaBell } from "react-icons/fa";
import { InviteListIcon } from "../client/invite/InviteListIcon";
import { CiSquarePlus } from "react-icons/ci";
import { useModalStatus } from "../store/ModalStore";

interface headerProps{
    size:number
}

export const Header:React.FC<headerProps> = ({size}) => {
    let location = useLocation();
    const navigator = useNavigate();

    const [title, setTitle] = useState<string>();

    useEffect(() => {
        console.log(location.pathname.split('/')[1]);
        switch (location.pathname.split('/')[1]) {
            case 'mypage':
                setTitle("내정보")
                break;
            case 'group':
                setTitle("그룹")
                break;
            case 'friend':
                setTitle("친구목록")
                break;
            case '':
                setTitle("홈")
                break;
            case 'chat':
                setTitle("채팅")
                break;
            case 'inviteList':
                setTitle("친구요청")
                break
            default:
                setTitle("다른 페이지")
                break;
        }
    }, [location.pathname]); // location.pathname이 변경될 때마다 useEffect 실행

    const [isClick, setIsClick] = useState<boolean>(false);
    const handleSearchButton = () => {
        setIsClick(!isClick)
    }


    const moveInviteList = () => {
        navigator('/inviteList')
    }


    //Onclick시 모달을 열게 만들어야함

    const {status,setStatus,deleteStatus} = useModalStatus();

    const controlModal =()=>{
        setStatus(!status)
        console.log(status)
    }

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
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
                <div>
                    <div className="input-group ms-2">
                        {isClick && (<ClientSearchInput setIsHeaderClick={setIsClick} />)}
                        <button onClick={handleSearchButton} className="btn btn-sm btn-outline-primary">{isClick ? (<span>닫기</span>) : (<span>친구찾기</span>)}</button>
                    </div>
                </div>
            )}
            {title === '그룹' && (
                <CiSquarePlus style={{cursor:"pointer"}}  size="40" color="#555" onClick={controlModal}/>
            )}

        </header>
    );
}
