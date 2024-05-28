import { useEffect, useState } from "react";
import { FriendInfo } from "./FriendInfo";
import axios from "axios";
import useClientInfo from "../store/UserStoer";
import { SlArrowDown } from "react-icons/sl";
import { FriendProfileModal } from "./FriendProfileModal";
import './friend.css';
import { Button, Offcanvas } from "react-bootstrap";
import { FriendDetail } from "./FriendDetail";
import { useOffcanvasState } from "../store/ModalStore";
import { useNavigate } from "react-router-dom";

type friendListType = {
    ownerId: string,
    memberId: string
}

export const FriendsList = () => {
    const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();

    const [friendList, setFriendList] = useState<friendListType[]>();
    const [friendInfo, setFriendInfo] = useState<friendListType>();

    const navigator = useNavigate();


    const getList = async () => {
        if (clientInfo) {
            try {
                const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/friend/list/${clientInfo.clientId}`);
                setFriendList(res.data);
                console.log(res.data)

            } catch {
                console.error("error")
            }
        }
    }

    useEffect(() => {
        getList()
    }, [clientInfo])

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const toggleList = () => {
        setIsOpen(!isOpen)
    }




    const { canvasIsOpen, setOffcanvasState } = useOffcanvasState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (friend: friendListType) => {
        setShow(true);
        if (friend) {
            setFriendInfo(friend)
        }
    }




    const seachIsExistChat = async () => {
        // 찾고 

        //없으면 
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2 mb-1 p-1 border border-2 rounded" >
                    <div style={{ cursor: "pointer" }}>
                        <FriendInfo friend={{ownerId:clientInfo.clientId, memberId:clientInfo.clientId}} handleShow={handleShow} />
                    </div>
                </div>
            </div>
            <div className="row mb-1">
                <div className="col">
                    <span style={{ fontSize: "11px" }}>
                        {friendList?.length} 명
                    </span>
                </div>
                <div className="col text-end">
                    <span style={{ fontSize: "11px" }} onClick={toggleList}>
                        <SlArrowDown />
                    </span>
                </div>
            </div>
            <div className="row">
                {isOpen && (
                    <>
                        {friendList?.map((friend, index) => (
                            <div className="col-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2 mb-1 p-1 border border-2 rounded" key={index}>
                                <div style={{ cursor: "pointer" }}>
                                    <FriendInfo friend={friend} handleShow={handleShow} />
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>


            <>
                <Offcanvas placement={"bottom"} show={show} onHide={handleClose} className="fullscreen-offcanvas">
                    <FriendDetail clientId={friendInfo?.memberId} />
                </Offcanvas>
            </>
        </div>
    );
}
