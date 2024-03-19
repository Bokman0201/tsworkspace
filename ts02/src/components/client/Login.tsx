import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

type loginInfoType = {
    clientEmail: string,
    clientPw : string
}
export const Login: React.FC = () => {

    const navigator = useNavigate();


    const [inputValues , setInputValues ] = useState<loginInfoType>({
        clientEmail:'',
        clientPw:''
    });

    const handleChangeInputTag =(e: ChangeEvent<HTMLInputElement>)=>{
        setInputValues({...inputValues,
        [e.target.name] : e.target.value
        })
    }

    const handleLogin =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(inputValues)

        axios({
            url:`http://localhost:8080/client/clientSignin`,
            method:'post',
            data:inputValues
        }).then(res =>{
            const clientInfo = res.data;

            //client로 세션스토리지에저장
            sessionStorage.setItem("client",JSON.stringify(clientInfo))
            navigator('/')

        }).catch();
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="row mt-2">
                <div className="col-lg-4">
                    <div>
                        <input type="email" name="clientEmail" value={inputValues.clientEmail} onChange={handleChangeInputTag} className="form-control" required placeholder="Email" />
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-4">
                    <div>
                        <input type="password" name="clientPw" value={inputValues.clientPw} onChange={handleChangeInputTag} className="form-control" required placeholder="password" />
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-4 text-end align-items-center">
                    <label style={{fontSize:'12px'}}>아이디 저장</label>
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-4 ">
                    <div className="row">
                        <div className="col ">
                            <Link to="/signup" className="">회원가입</Link>
                        </div>
                        <div className="col text-end ">
                            <button className="btn btn-primary">로그인</button>
                        </div>
                    </div>

                </div>

            </div>
        </form>
    );
}