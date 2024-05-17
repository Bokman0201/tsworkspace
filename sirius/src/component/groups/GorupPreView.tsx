import axios from "axios";
import React, { useEffect, useState } from "react";
import useClientInfo from "../store/UserStoer";

interface groupProps {
    groupNo: number
}

interface groupInfoType {
    groupNo: number,
    groupName: string,
    groupHost: string
}
export const GorupPreView: React.FC<groupProps> = ({ groupNo }) => {

    const {clientInfo} = useClientInfo();

    const [groupInfo, setGroupInfo] = useState<groupInfoType>();

    const getGroupInfo = async () => {

        const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/groups/groupInfo/${groupNo}`)
        setGroupInfo(res.data);
    }

    useEffect(() => {
        getGroupInfo();
    }, [])

    return (
        <div className="row border mt-2">
            <div className="col-12">
                <span style={{ fontWeight: 'bold' }}>{groupInfo?.groupName}</span>
            </div>
            <div className="col">{groupInfo?.groupHost ===clientInfo.clientId?(<span>나</span>):(<span>{groupInfo?.groupHost}</span>)}</div>
        </div>
    );
}