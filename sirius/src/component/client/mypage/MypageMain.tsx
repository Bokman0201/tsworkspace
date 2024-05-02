import { NavLink, useNavigate } from "react-router-dom";
import { ProfileImg } from "../img/ProfileImg";
import { useEffect } from "react";
import useClientInfo from "../../store/UserStoer";

export const MyPageMain = () => {

    const {clientInfo , setClientInfo, deleteClientInfo} = useClientInfo();
    const navigator = useNavigate();

    useEffect(()=>{
        if(clientInfo.clientId===""){
            alert("로그인 후 이용")
            navigator("/login")
        }
    },[])

    const handleLogOut = () => {
        sessionStorage.removeItem("clientInfo")
    }
    return (
        <div className="">

            <div className="row border p-2">
                <div className="col-12">
                    <ProfileImg />
                </div>
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