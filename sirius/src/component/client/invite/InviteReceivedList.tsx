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

    const [isLoading, setIsLoading] = useState(false);


    const getReceivedList = async () => {
        setIsLoading(true);
        if (clientInfo.clientId) {
            try {

                const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/invite/received/${clientInfo.clientId}`)
                setReceivedList(res.data);
                console.log(res.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // 응답이 도착하면 로딩 중 상태를 false로 설정합니다.
            }
        }
    }

    const handleResponseButton = (val: string) => {
        if (val === 'refuse') {
            console.log("거절")
        } else if (val === "accept") {
            alert("accept")
        }
    };

    useEffect(() => {
        getReceivedList();
    }, [clientInfo])
    return (
        <div>
            {isLoading && <div>Loading...</div>}


            {!isLoading && (
                <>
                    {receivedList ? (<>
                        {
                            receivedList.map((item, index) => (
                                <div className="border p-2 mb-2" key={index}>
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
                                            <button type="button" className="btn btn-primary btn-sm" onClick={() => handleResponseButton("accept")}>수락</button>
                                            <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => handleResponseButton("refuse")}>거절</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </>

                    ) : (
                        <span>요청 없음</span>
                    )
                    }

                </>
            )}


        </div >
    );
}