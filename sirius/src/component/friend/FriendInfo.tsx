import React, { useEffect, useState } from "react";
import { ProfileImg } from "../client/img/ProfileImg";
import { friendListType } from "../store/FriendStore";
import './friend.css';
import useClientInfo from "../store/UserStoer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface friendProps {
    handleShow: (friend: friendListType) => void
    friend : friendListType
}
export const FriendInfo:React.FC<friendProps> = ({ handleShow , friend }) => {
    const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();

    const [clicks, setClicks] = useState<number>(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const navigator = useNavigate();


    useEffect(() => {
        if (clicks === 2) {
            handleDoubleClick(friend);
            if (timer) clearTimeout(timer);
            setClicks(0);
        }
    }, [clicks, friend, timer]);


    const handleSingleClick = () => {

    };



    const handleDoubleClick = async(friend:friendListType)=>{
        if(clientInfo.clientId === friend.memberId){ return}

        setClicks(prev => prev + 1);
        setTimer(setTimeout(() => {
            setClicks(0);
        }, 300)); // 300ms interval for detecting double-click
        console.log(friend)
        if (clientInfo.clientId !== "") {
            //찾아보고 
            try {
                const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/chat/findExist/${clientInfo.clientId}/${friend.memberId}/DM`)
                console.log(res.data);
                const roomNo = res.data;
                //없으면 방만들고 
                if (roomNo === 0) {
                    axios({
                        url: `${process.env.REACT_APP_REST_API_URL}/chat/createRoom`,
                        method: 'post',
                        data: {
                            chatClientId: [
                                clientInfo.clientId, friend.memberId
                            ],
                            chatRoomName: "",
                            chatType: "DM"
                        }
                    }).then(async res => {
                        //성공하면 방다시 찾고
                        try {
                            const response = await axios.get(`${process.env.REACT_APP_REST_API_URL}/chat/findExist/${clientInfo.clientId}/${friend.memberId}/DM`);
                            const roomNo = response.data;
                            sessionStorage.setItem("roomNo", roomNo); // sessionStorage에 저장
                            navigator("/chatRoom")
                        } catch (error) {
                            console.error('Error fetching roomNo:', error);
                        }

                    }).catch(err => {
                        console.error(err.response)
                    });
                } else {
                    sessionStorage.setItem("roomNo", roomNo);
                    navigator('/chatRoom');

                }
            } catch (e) {
                console.log(e);

            }

        }
    }
    return (
        <>
            <div className="row">
                <div className="col-3  d-flex text-start " onClick={()=>handleShow(friend)}>
                    <ProfileImg />
                </div>
                <div className="col d-flex align-items-center justify">

                    <div className="row" onClick={() => handleDoubleClick(friend)}>
                        <div> <h5>{friend.memberNick}</h5></div>
                        <div className="col d-flex align-items-center ">
                            <span style={{ fontSize: "12px" }}>나는 아무것도 하기 싫으지</span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}