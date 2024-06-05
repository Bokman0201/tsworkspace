import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";
import useClientInfo from "../store/UserStoer";
import { friendListType } from "../store/FriendStore";
import "./chat.css";
import { useNavigate } from "react-router-dom";

export const AddChat = () => {
    const { clientInfo } = useClientInfo();
    const [friendList, setFriendList] = useState<friendListType[]>();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달의 열림/닫힘 상태를 관리하는 상태

    const [selectedFriendList, setSelectedFriendList] = useState<string[]>([clientInfo.clientId]);

    const navigator = useNavigate();

    const openModal = () => {
        setIsModalOpen(true); // 모달을 열기 위한 상태 업데이트
    };

    const closeModal = () => {

        setSelectedFriendList([clientInfo.clientId])

        setIsModalOpen(false); // 모달을 닫기 위한 상태 업데이트
    };

    const getFriendList = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/friend/list/${clientInfo.clientId}`)
            setFriendList(res.data)
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getFriendList();
    }, [clientInfo])

    const createNewChat = () => {
        axios({
            url: `${process.env.REACT_APP_REST_API_URL}/chat/createRoom`,
            method: 'post',
            data: {
                chatClientId: selectedFriendList,
                chatRoomName: roomName
            }
        }).then(res => {
            console.log(res.status)
            const roomNo =res.data
            const httpCode = res.status;
            if(httpCode ===200){

                if(roomNo !== 0){
                    sessionStorage.setItem("roomNo", roomNo); // sessionStorage에 저장
                    navigator("/chatRoom")
                }
                closeModal();
            }

            // 화면 리로딩을 위한 스테이트 전달

        }).catch(e=>{
            console.error(e)
        }).finally();

    }

    const handleAddChatMember = (e: React.ChangeEvent<HTMLInputElement>) => {

        console.log(e.target.checked)
        const isChecked = e.target.checked;
        const value = e.target.value;

        if (isChecked) {
            console.log(e.target.value)
            setSelectedFriendList([...selectedFriendList, value])
        } else {
            const updatedList = selectedFriendList.includes(value)
                ? selectedFriendList.filter(id => id !== value)
                : [...selectedFriendList, value];
            setSelectedFriendList(updatedList)
        }


    }

    const handleRemoveFriend = (friend: string) => {
        setSelectedFriendList(selectedFriendList.filter(f => f !== friend));
    };

    const [roomName, setRoomName] = useState<string>("");

    const handleChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setRoomName(e.target.value);
    }

    useEffect(() => {
        console.log(selectedFriendList)
    }, [selectedFriendList])
    return (
        <>
            <button className="btn btn-sm" onClick={openModal}>+</button>

            <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>새 채팅</Modal.Title>
                </Modal.Header>
                <Modal.Body>F
                    <div className="row">
                        <div className="col-12">
                            <input value={roomName} onChange={handleChangeRoomName} name="chatRoomName" className="form-control" autoComplete="off" placeholder="roomName" />
                        </div>
                    </div>

                    {selectedFriendList.length > 0 ? (
                        <>
                            {
                                selectedFriendList.map((select, index) => (
                                    <div key={index} className="badge-hover me-1 mt-2">
                                        <Badge pill bg="secondary">
                                            {select}
                                            <button className="close-button" onClick={() => handleRemoveFriend(select)} disabled={clientInfo.clientId === select}>
                                                &times;
                                            </button>
                                        </Badge>
                                    </div>
                                ))
                            }
                        </>
                    ) : (
                        <>
                            <div className="mt-2">
                                <span>선택된 회원 없음</span>
                            </div>
                        </>
                    )}


                    <div className="row mt-2">
                        {friendList?.map((friend, index) => (
                            <div className="col-12 checkbox-container" key={index}>
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    value={friend.memberId}
                                    onChange={handleAddChatMember}
                                />
                                <span>{friend.memberId}</span>
                            </div>
                        ))}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={createNewChat}>
                        Create
                    </Button>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}