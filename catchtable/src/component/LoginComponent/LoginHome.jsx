import { useEffect, useState } from "react";
import {  requestLogin } from "./LoginFunctions";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export const LoginHome = () => {
    useEffect(() => {
        if (sessionStorage.getItem("clientInfo") !== null) {
            alert("잘못된 접근");
            navigator(-1);
        }
    }, [])
    const [loginInfo, setLoginInfo] = useState({ clientId: '' });
    const navigator = useNavigate();


    const handleInputChange = (e) => {
        console.log(e.target.name);
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmitLoginBtn = async (e) => {
        e.preventDefault(); // 기본 이벤트 제거
        const success = await requestLogin(loginInfo);
        if (success) {
            navigator('/');
        } else {
            console.log("Login failed");
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmitLoginBtn}>
                <input type="text" placeholder="Id" name="clientId" value={loginInfo.clientId} onChange={handleInputChange} />
                <input type="password" placeholder="password" name="clientPw" value={loginInfo.clientPw} onChange={handleInputChange} />
                <button >login</button>
            </form>

            <NavLink to={'/signUp'}>sign up</NavLink>
        </div>
    );
}