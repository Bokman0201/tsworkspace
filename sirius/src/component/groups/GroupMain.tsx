import React, { useEffect, useState } from "react";
import { GroupChatting } from "./GroupChatting";
import { NavLink, useNavigate } from "react-router-dom";
import { CreateGroup } from "./CreateGroup";
import axios from "axios";
import { error } from "console";
import { GorupPreView } from "./GorupPreView";
import useClientInfo from "../store/UserStoer";



export const GroupsMain: React.FC = () => {
    const navigator = useNavigate();

    const { clientInfo } = useClientInfo();

    const [groupList, setGroupList] = useState<number[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const getGroupList = async () => {


        setLoading(false)
        if (clientInfo.clientId !=='') {
            try {
                const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/groups/groupList/${clientInfo.clientId}`);
                setGroupList(res.data)
            } catch (e) {
                console.error("error", e)
            } finally {
                setLoading(true)
            }
        }
    }

    useEffect(() => {
        getGroupList();
    }, [clientInfo])

    return (

        <div className="scroll">


            {groupList?.length === 0 ? (
                <div>가입된 그룹이 없어요 </div>
            ) : (
                <div className="list">
                    {groupList?.map((groupNo, index) => (
                        <GorupPreView groupNo={groupNo} key={index} />
                    ))}
                </div>

            )}
            <NavLink to={"/groupChat"}>go chat</NavLink>

            <CreateGroup />
        </div>
    );
}