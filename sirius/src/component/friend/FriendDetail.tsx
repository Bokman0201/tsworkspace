import axios from "axios";
import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import useClientInfo from "../store/UserStoer";

interface friendProps {
    clientId: string | undefined
}


export const FriendDetail: React.FC<friendProps> = ({ clientId }) => {
    const { clientInfo } = useClientInfo();
    const navigator = useNavigate();
    const [isMyFriend, setIsMyFriend] = useState<boolean>(false)


    //친구 목록에 있는지 확인 
    const searchFriendList =async()=>{
        const res =await axios.get(`${process.env.REACT_APP_REST_API_URL}/friend/isMyFriend/${clientInfo.clientId}/${clientId}`)
        setIsMyFriend(res.data)
    }

    useEffect(()=>{
        searchFriendList();
    },[])


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
    return (
        <>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{clientId}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="row">
                    <div className="col">

                        {isMyFriend?(
                            <button onClick={seachIsExistChat} className="btn btn-primary" >1:1대화하기</button>
                        ):(
                            <button className="btn btn-primary">친구추가하기</button>
                        )}
                    </div>
                </div>




            </Offcanvas.Body>
            <div className="offcanvas-footer">
            </div>
        </>
    );
}