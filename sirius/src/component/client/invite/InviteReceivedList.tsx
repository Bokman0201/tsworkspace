import axios from "axios";
import { useEffect, useState } from "react";
import useClientInfo from "../../store/UserStoer";

type inviteType = {
    clientId: string
    invitedClient: string
    inviteTime: string
    inviteStatus: number
}
export const InviteReceivedList = () => {


    const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();

    const [receivedList, setReceivedList] = useState<inviteType[]>();

    const getReceivedList = async () => {
        if (clientInfo.clientId) {
            const res = await axios.get(`http://localhost:8080/invite/received/${clientInfo.clientId}`)
            setReceivedList(res.data);
            console.log(res.data)
        }
    }

    useEffect(() => {
        getReceivedList();
    }, [clientInfo])
    return (
        <div>
            {receivedList ? (<>
                {receivedList.map((item, index) => (
                    <div className="border p-2 mb-2">
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col-12">
                                        {item.clientId}
                                    </div>
                                    <div className="col-12" style={{ fontSize: "12px" }}>
                                        {item.inviteTime.split(" ")[0]}
                                    </div>
                                </div>
                            </div>
                            <div className="col d-flex align-items-center justify-content-end">
                                <button type="button" className="btn btn-primary btn-sm">수락</button>
                                <button type="button" className="btn btn-danger btn-sm ms-2">거절</button>
                            </div>
                        </div>
                    </div>
                ))}
            </>

            ) : (
                <span>요청 없음</span>
            )}

        </div>
    );
}