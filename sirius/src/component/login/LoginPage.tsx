import { ChangeEvent, useState } from "react";
import { FaGit } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import useClientInfo from "../store/UserStoer";


type clientLoginType = {
    clientId: string
    clientPw: string
}

export const LoginPage = () => {

    const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();


    const navigator =useNavigate();



    const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {

        console.log(`${process.env.REACT_APP_REST_API_URL}`)
        const id = event.currentTarget.id;

        //window.location.href = `${process.env.REACT_APP_REST_API_URL}/oauth/${id}`;
        window.location.href = `${process.env.REACT_APP_REST_API_URL}/oauth/${id}`;
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        axios({
            url:`${process.env.REACT_APP_REST_API_URL}/api/login`,
            method:'post',
            data:loginData
        }).then(res=>{
            setClientInfo(res.data);
            sessionStorage.setItem("clientInfo" ,JSON.stringify(res.data) );

            navigator("/")
        }).catch()


    };


    const [loginData, setLoginData] = useState<clientLoginType>({
        // 초기값 설정
        clientId: '',
        clientPw: '',
    });

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(({
            ...loginData,
            [name]: value,
        }));
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

            <div className="container ">
                <form onSubmit={handleSubmit}>
                    <div className="row mt-2">
                        <div className="col-lg-6 offset-lg-3">
                            <input type="text" name="clientId" required className="form-control" onChange={inputChange} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-lg-6 offset-lg-3">
                            <input type="password" name="clientPw" onChange={inputChange} className="form-control" />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-lg-6 offset-lg-3">
                            <button type="submit" className="btn w-100 btn-primary" >로그인</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 text-end">
                            <Link to={"/clientJoin"}>회원가입</Link >
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-lg-6 offset-lg-3 text-center pointer">
                            <div className="row">
                                <div className="col" id=""><span><FaGit /></span></div>
                                <div className="col"><span><SiNaver /></span></div>
                                <div className="col" id="kakao" onClick={handleButtonClick}><span><RiKakaoTalkFill /></span></div>
                                <div className="col"><span><FaGoogle /></span></div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}