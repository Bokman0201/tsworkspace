import { NavLink } from "react-router-dom";
import "./Footer.css";
import useClientInfo from "../store/UserStoer";

export const Footer = () => {
    const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();


    return (
        <nav className="fixed-nav">
            <ul>
                <li><NavLink to={"/"}>Home</NavLink></li>
                <li><NavLink to={"/chat"}>chat</NavLink></li>
                <li><NavLink to={"/"}>Services</NavLink></li>

                {clientInfo.clientId !== ""?(
                    <li><NavLink to={"/mypage"}>MyPage</NavLink></li>
                ):(
                    <li><NavLink to={"/login"}>login</NavLink></li>
                )}
            </ul>
        </nav>
    );
}