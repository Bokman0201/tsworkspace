import { NavLink, useNavigate } from "react-router-dom";
import { ProfileImg } from "../img/ProfileImg";
import { useEffect } from "react";
import useClientInfo from "../../store/UserStoer";

export const MyPageMain = () => {

    const sessionClientInfo = sessionStorage.getItem("clientInfo")
    const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();
    const navigator = useNavigate();

    useEffect(() => {
        if (!sessionClientInfo) {
            alert("로그인 후 이용")
            navigator("/login")
        }
    }, [])

    const handleLogOut = () => {
        sessionStorage.removeItem("clientInfo")
    }
    return (
        <div className="">

            <div className="row  p-2 ">
                    <ProfileImg />
            </div>
            <div className="row">
                {clientInfo.clientId}
            </div>
            <div className="row">
                <NavLink to={"/infoupdate"}>정보수정</NavLink>
            </div>
            <div className="row">
                <div className="col text-end">
                    <NavLink to={"/"} onClick={handleLogOut}>logout</NavLink>
                </div>
            </div>
        </div>
    );
}