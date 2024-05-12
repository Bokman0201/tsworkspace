import axios from "axios";
import { useEffect, useState } from "react";
import useClientInfo from "../../store/UserStoer";
import { InviteReceivedList } from "./InviteReceivedList";
import { InviteSentList } from "./InviteSentList";

type inviteType = {
    clientId: string
    invitedClient: string
    inviteTime: string
    inviteStatus: number
}

export const InviteList = () => {
    const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();

    const [receivedList, setReceivedList] = useState<inviteType[]>();

    const getReceivedList = async () => {
        if (clientInfo.clientId) {
            const res = await axios.get(`http://localhost:8080/invite/received/${clientInfo.clientId}`)
            setReceivedList(res.data);
            console.log(res.data)
        }
    }

    //리스트 컴포넌트 교체 함수\
    const [component, setComponent] = useState<string>("received");

    const handleToggleList = (value: string) => {
        setComponent(value);
    }


    useEffect(() => {
        getReceivedList();
    }, [clientInfo])

    return (
        <div>
            <div className="row mb-2">
                <div className="col">
                    <button
                        type="button"
                        onClick={() => handleToggleList("received")}
                        className={`btn w-100 ${component === "received" ? "active" : ""}`}
                    >
                        받은요청
                    </button>
                </div>
                <div className="col">
                    <button
                        type="button"
                        onClick={() => handleToggleList("sent")}
                        className={`btn w-100 ${component === "sent" ? "active" : ""}`}
                    >
                        보낸요청
                    </button>
                </div>
            </div>

            {component === 'received' && (
                <InviteReceivedList />
            )}

            {component === 'sent' && (
                <InviteSentList />
            )}
        </div>

    );
}