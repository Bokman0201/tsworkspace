import { ChangeEvent, useEffect, useState } from "react";
import { Client, ClientInfoResult } from "../../model/client";
import axios, { Axios } from "axios";

export const Signin: React.FC = () => {

    const [clientInfo, setClientInfo] = useState<Client>({
        clientEmail: '',
        clientName: '',
        clientPw: '',
        clientPwCheck: '',
    });
    const [clientInfoResult, setClientInfoResult] = useState<ClientInfoResult>({
        clientEmailResult: null,
        clientNameResult: null,
        clientPwResult: null,
        clientPwCheckResult: null
    })

    const handleChangeClientInfo = (e: ChangeEvent<HTMLInputElement>) => {
        setClientInfo({
            ...clientInfo,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        const nameRegex = /^[a-zA-Z가-힣]{2,20}$/;
        const pwRegex = /^(?=.*[!@#$%^&*?])(?=.*[A-Z]).{1,16}$/;

        setClientInfoResult({
            ...clientInfoResult,
            clientPwResult: clientInfo.clientPw.length > 0 ? pwRegex.test(clientInfo.clientPw) : null,
            clientPwCheckResult: clientInfo.clientPwCheck.length > 0 ? clientInfo.clientPw === clientInfo.clientPwCheck : null,
            clientNameResult: clientInfo.clientName.length > 0 ? nameRegex.test(clientInfo.clientName) : null
        });
    }, [clientInfo]);


    const [emailResult, setEmailResult] = useState<Boolean>(false);
    const [loading, setLoading] = useState<boolean | null>(null);

    const handleEmailSend = () => {
        if (clientInfo.clientEmail.length > 0) {

            setLoading(true)
            axios({
                url: `${process.env.REACT_APP_REST_API_URL}/client/EmailAuthentication/${clientInfo.clientEmail}`,
                method: 'post'
            }).then(res => {
                console.log(res.status)
                if (res.status === 200) {
                    alert("전송되었습니다.")
                    //전송중이라는 로딩상태 만들기
                    setLoading(false)
                    setEmailResult(true);
                    setClientInfoResult({
                        ...clientInfoResult,
                        clientEmailResult: true
                    })
                }
            }).catch();
        }
        else{
            alert("이메일을 입력해주세요")
        }
    }
    return (
        <form autoComplete="off">
            <div className="row mt-4" >
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <div className="input-group">
                        <input className="form-control" value={clientInfo.clientEmail} name="clientEmail" onChange={handleChangeClientInfo} required placeholder="아이디 이메일 형식" />
                        <button type="button" className="btn btn-outline-primary" onClick={handleEmailSend}>이메일 인증</button>
                    </div>
                    {clientInfoResult.clientEmailResult === true && (
                        <div className="text-center">
                            <span className=" mt-1 text-success">사용 가능한 이메일</span>
                        </div>
                    )}
                    {clientInfoResult.clientEmailResult === false && (
                        <div className="text-center">
                            <span className=" mt-1 text-danger">사용 불가능한 이메일</span>
                        </div>
                    )}
                    <div>
                    </div>
                </div>
            </div>
            {emailResult === true && (
                <div className="row ">
                    <div className="col-lg-4  col-md-6 offset-md-4 offset-lg-5 ">
                        <div className="input-group ">
                            <input className="form-control" required placeholder="인증번호 입력" />
                            <button className="btn btn-outline-secondary">인증하기</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="row mt-2">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <input className="form-control" value={clientInfo.clientName} name="clientName" onChange={handleChangeClientInfo} required placeholder="이름 or 닉네임" />
                </div>
                {clientInfoResult.clientNameResult === true && (
                    <div className="text-center">
                        <span className=" mt-1 text-success">사용 가능한 이름</span>
                    </div>
                )}
                {clientInfoResult.clientNameResult === false && (
                    <div className="text-center">
                        <span className=" mt-1 text-danger">사용 불가능한 이름</span>
                    </div>
                )}
            </div>
            <div className="row mt-2">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <input type="password" className="form-control" value={clientInfo.clientPw} name="clientPw" onChange={handleChangeClientInfo} required placeholder="비밀번호" />
                </div>
                {clientInfoResult.clientPwResult === true && (
                    <div className="text-center">
                        <span className=" mt-1 text-success">사용 가능한 이름</span>
                    </div>
                )}
                {clientInfoResult.clientPwResult === false && (
                    <div className="text-center">
                        <span className=" mt-1 text-danger">사용 불가능한 이름</span>
                    </div>
                )}
            </div>
            <div className="row mt-2">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <input type="password" className="form-control" value={clientInfo.clientPwCheck} name="clientPwCheck" onChange={handleChangeClientInfo} required placeholder="비밀번호 확인" />
                </div>
                {clientInfoResult.clientPwCheckResult === true && (
                    <div className="text-center">
                        <span className=" mt-1 text-success">사용 가능한 이름</span>
                    </div>
                )}
                {clientInfoResult.clientPwCheckResult === false && (
                    <div className="text-center">
                        <span className=" mt-1 text-danger">사용 불가능한 이름</span>
                    </div>
                )}
            </div>
            {/* <div className="row mt-4">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <div className="input-group">
                        <input className="form-control" required placeholder="우편번호" />
                        <button type="button" className="btn btn-outline-primary">우편번호 찾기</button>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <input className="form-control" required placeholder="상세 주소" />
                </div>
            </div> */}

            <div className="row mt-4">
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <button type="submit" className="btn btn-primary w-100">가입하기</button>
                </div>
            </div>
        </form>
    );
}