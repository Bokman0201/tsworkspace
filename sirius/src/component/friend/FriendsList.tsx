import { useEffect, useState } from "react";
import { FriendInfo } from "./FriendInfo";
import axios from "axios";
import useClientInfo from "../store/UserStoer";
import { SlArrowDown } from "react-icons/sl";

type friendListType = {
    ownerId: string,
    memberId: string
}

export const FriendsList = () => {
    const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();

    const [friendList, setFriendList] = useState<friendListType[]>();

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


    return (
        <div className=" ">
            <div className="row mb-1">
                <div className="col ">
                    <span style={{ fontSize: "11px" }}>
                        {friendList?.length} 명</span>
                </div>
                <div className="col text-end">
                    <span style={{ fontSize: "11px" }} onClick={toggleList}>
                        <SlArrowDown />
                    </span>
                </div>
            </div>
            <div className="row">
                {isOpen ? (
                    <>
                        {friendList?.map((friend, index) => (
                            <div className="col-lg-8 offset-lg-2 col-sm-12 mb-1 p-2 border border-2 rounded" style={{ borderWidth: '10px' }} key={index}>
                                <div style={{ cursor: "pointer" }}>
                                    <FriendInfo friendId={friend.memberId} />
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
} 