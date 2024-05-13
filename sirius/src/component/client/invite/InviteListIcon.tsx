import { FaBell } from "react-icons/fa";
import useClientInfo from "../../store/UserStoer";
import axios from "axios";
import { useEffect, useState } from "react";
import { error } from "console";

export const InviteListIcon = () => {
    const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();
    const [count, setCount] = useState<number>(0);

    const getPushAlarm = async () => {
        console.log(clientInfo)
        if (clientInfo) {
            try {
                const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/invite/push/${clientInfo.clientId}`)
                setCount(res.data)
                console.log(res.data)
            } catch {
            }
        }

    }


    useEffect(() => {
        getPushAlarm();
    }, [clientInfo])


    return (
        <>
            <div className="position-relative">
                <div className="" style={{ fontSize: '1rem' }}><FaBell /></div>
                <div className="position-absolute top-0 start-100 translate-middle">
                    {count !== 0 && (
                        <span className="badge rounded-pill bg-danger" style={{ fontSize: '0.5rem' }}>{count}</span>
                    )}
                </div>
            </div>
        </>
    );
}