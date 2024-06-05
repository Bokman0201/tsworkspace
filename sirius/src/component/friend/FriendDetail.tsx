import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import useClientInfo from "../store/UserStoer";
import './Offcanvas.css';
import { FaEdit } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { useModalStatus } from "./Modal";
import { FriendProfileModal } from "./FriendProfileModal";


interface friendProps {
    clientId: string | undefined
}


export const FriendDetail: React.FC<friendProps> = ({ clientId }) => {
    const { clientInfo } = useClientInfo();
    const navigator = useNavigate();
    const [isMyFriend, setIsMyFriend] = useState<boolean>(false)


    //친구 목록에 있는지 확인 
    const searchFriendList = async () => {
        const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/friend/isMyFriend/${clientInfo.clientId}/${clientId}`)
        setIsMyFriend(res.data)
    }

    useEffect(() => {
        searchFriendList();
    }, [])


    const seachIsExistChat = async () => {
        // 찾고 
        if (clientInfo.clientId !== "") {
            //찾아보고 
            try {
                const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/chat/findExist/${clientInfo.clientId}/${clientId}/DM`)
                console.log(res.data);
                const roomNo = res.data;
                //없으면 방만들고 
                if (roomNo === 0) {
                    axios({
                        url: `${process.env.REACT_APP_REST_API_URL}/chat/createRoom`,
                        method: 'post',
                        data: {
                            chatClientId: [
                                clientInfo.clientId, clientId
                            ],
                            chatRoomName: "",
                            chatType: "DM"
                        }
                    }).then(async res => {
                        //성공하면 방다시 찾고
                        try {
                            const response = await axios.get(`${process.env.REACT_APP_REST_API_URL}/chat/findExist/${clientInfo.clientId}/${clientId}/DM`);
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
        //없으면 
    }

    const { ModalIsOpen, deleteModalIsOpen, setModalIsOpen } = useModalStatus();
    const editProfile = () => {
        setModalIsOpen(true);
    }

    const [showFullText, setShowFullText] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (container && container.scrollWidth > container.clientWidth) {
            setIsOverflowing(true);
        } else {
            setIsOverflowing(false);
        }
    }, [showFullText]);

    const handleToggleText = () => {
        setShowFullText(!showFullText);
    };

    const text = "상태메세지".repeat(10);

    return (
        <div className="offcanvas-container">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                <div className="background-img">
                    <img src="https://dummyimage.com/90x90/#f0f0f0/#fff" alt="background" />
                </div>

                <div className="content">
                    <div className="mb-2">
                        <img src="https://dummyimage.com/90x90/000/fff" alt="foreground" />
                    </div>
                    <div className="client-name mb-2">
                        <span>{clientId}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "0 20%", flexWrap: "wrap" }}>
                        <div ref={containerRef} style={{ width: "100%", maxWidth: "60ch", overflow: showFullText ? "visible" : "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                            <span>{text}</span>
                        </div>
                    </div>
                    {isOverflowing && (
                            <button onClick={handleToggleText} style={{ marginLeft: "10px" }}>
                                {showFullText ? "접기" : "더 보기"}
                            </button>
                        )}
                    <div className="p-3 border-top">
                        <div className="btn-group w-100">
                            <div className="btn-wrapper">
                                <button className="btn-clear w-100"><IoChatbox size={30} /></button>
                                <span>채팅</span>
                            </div>
                            <div className="btn-wrapper">
                                <button onClick={editProfile} className="btn-clear w-100"><FaEdit size={30} /></button>
                                <span>프로필 편집</span>
                            </div>
                        </div>

                    </div>
                </div>
            </Offcanvas.Body>


            {/* <div className="offcanvas-footer">
                {clientId === clientInfo.clientId ? (
                    <div className="row">
                        <button className="btn btn-primary">프로필 설정</button>
                    </div>
                ) : (
                    <>
                        {isMyFriend ? (
                            <button onClick={seachIsExistChat} className="btn btn-primary" >1:1대화하기</button>
                        ) : (
                            <button className="btn btn-primary">친구추가하기</button>
                        )}
                    </>
                )}

                
            </div> */}
            <FriendProfileModal />
        </div>
    );
}