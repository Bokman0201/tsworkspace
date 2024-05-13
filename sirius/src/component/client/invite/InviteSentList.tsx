import axios from "axios";
import { useEffect, useState } from "react";
import useClientInfo from "../../store/UserStoer";

type inviteType = {
    clientId: string
    invitedClient: string
    inviteTime: string
    inviteStatus: number
}
export const InviteSentList = () => {

    const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();

    const [sentList, setSentList] = useState<inviteType[]>();

    const [isLoading, setIsLoading] = useState(false);

    const getSentList = async () => {
        setIsLoading(true); // 로딩 중 상태를 true로 설정합니다.
        if (clientInfo.clientId) {
            try {
                const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/invite/sent/${clientInfo.clientId}`);
                setSentList(res.data);
                console.log(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // 응답이 도착하면 로딩 중 상태를 false로 설정합니다.
            }
        }
    };

    useEffect(() => {
        getSentList();
    }, [clientInfo])
    return (
        <div>

            {isLoading && <div>Loading...</div>}


            {!isLoading && (
                <>
                    {sentList ? (<>
                        {sentList.map((item, index) => (
                            <div className="border p-2 mb-2"  key={index}>
                                <div className="row">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col-12">
                                                {item.invitedClient}
                                            </div>
                                            <div className="col-12" style={{ fontSize: "12px" }}>
                                                {item.inviteTime.split(" ")[0]}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-end">
                                        <div className="border border-2 border-primary rounded p-1 d-inline-block bg-primary text-white ">
                                            {item.inviteStatus === 0 && (
                                                <>요청중</>
                                            )}
                                            {item.inviteStatus === 1 && (
                                                <>수락</>
                                            )}
                                            {item.inviteStatus === -1 && (
                                                <>거절됨</>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>

                    ) : (
                        <span>요청 없음</span>
                    )}
                </>
            )}


        </div>
    );
}