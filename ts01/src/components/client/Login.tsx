import { ChangeEvent, useEffect, useState } from "react";
import { LoginInfo } from "../../model/client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const navigator = useNavigate();

    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
        loginId: '',
        loginPw: '',
    });

    const handleChangeInfo = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        //console.log(loginInfo)
    }, [loginInfo])

    const handleSubmit = () => {

        axios({
            url: `http://localhost:8080/client/login`,
            method: 'post',
            data: loginInfo
        }).then(res => {
            if (res.status === 200) {
                const userData = res.data;

                const toStringUserData = JSON.stringify(userData);
                sessionStorage.setItem("userInfo", toStringUserData);
                navigator("/")
            }
        }).catch(err => {
            console.error(err.response.status)
        });

    }


    return (
        <  >
            <div className="row mt-5">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <input type="email" name="loginId" onChange={handleChangeInfo} required className="form-control" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <input type="password" name="loginPw" onChange={handleChangeInfo} className="form-control" />
                </div>
            </div>
            <div className="row mt-3 aling-items-center">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">

                    <div className="form-check form-switch form-check-reverse">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckReverse" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckReverse">RememberID</label>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <button type="button" onClick={handleSubmit} className="btn btn-primary w-100">login</button>
                </div>
            </div>
        </>
    );
}