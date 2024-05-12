import { FaBell } from "react-icons/fa";
import useClientInfo from "../../store/UserStoer";

export const InviteListIcon = () => {
    const {clientInfo , setClientInfo, deleteClientInfo} = useClientInfo();


    return (
        <>
            <div className="position-relative">
                <div className="" style={{ fontSize: '1rem' }}><FaBell /></div>
                <div className="position-absolute top-0 start-100 translate-middle">
                    <span className="badge rounded-pill bg-danger" style={{ fontSize: '0.5rem' }}>3</span>
                </div>
            </div>
        </>
    );
}