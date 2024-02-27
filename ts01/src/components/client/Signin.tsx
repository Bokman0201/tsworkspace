import { ChangeEvent, useEffect, useState } from "react";
import { Client, ClientInfoResult } from "../../model/client";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";

export const Signin: React.FC = () => {

    const navigator = useNavigate();

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


    const [loading, setLoading] = useState<boolean | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    //이메일 전송상태 타이머 시작용
    const [isStatus, setIsStatus] = useState<boolean>(false);

    const [time, setTime] = useState<number>(180); // 초 단위로 타이머 시간 저장
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }

        if (time === 0) {
            alert('시간 초과');
            setIsStatus(false);
            //클라이언트 아이디로 인증번호 제거
            resetTimer();
        }

        return () => {
            clearInterval(interval);
        };
    }, [isActive, time]);

    const startTimer = () => {
        setIsActive(true);
    };

    const pauseTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        deleteAuth();
        setIsActive(false);
        setTime(180); // 3분으로 초기화
    };

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleEmailSend = () => {
        deleteAuth();
        if (clientInfo.clientEmail.length > 0) {
            //전송전에 모든 같은 이메일의 auth 제거 
            setLoading(true)
            axios({
                url: `${process.env.REACT_APP_REST_API_URL}/client/EmailAuthentication/${clientInfo.clientEmail}`,
                method: 'post'
            }).then(res => {
                console.log(res.status)
                if (res.status === 200) {
                    alert("전송되었습니다.")
                    startTimer();
                    //전송중이라는 로딩상태 만들기
                    setLoading(false)
                    setIsStatus(true)

                }
            }).catch(
                err => {
                    if (err.response.status === 400) {
                        alert("이미 가입된 회원입니다.")
                    }
                }
            );
        }
        else {
            alert("이메일을 입력해주세요")
        }
    }

    const [code, setCode] = useState<string>();
    const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }

    const handleMatchCode = () => {

        axios({
            url: `http://localhost:8080/client/isMatchAuth/${clientInfo.clientEmail}/${code}`,
            method: 'post'
        }).then(res => {
            if (res.status === 200) {
                alert('인증 되었습니다.')

                //타이머 종료 
                //모든 auth삭제 
                resetTimer();
                //인증상태 true
                setIsAuth(true)
                setIsStatus(false)
                setClientInfoResult({
                    ...clientInfoResult,
                    clientEmailResult: true
                })
            }
        }).catch(err => {
            if (err.response.status === 404) {
                //not found
            }
            else if (err.response.status === 400) {
                //bad request
            }
            else {
                //network err
            }
        });
    }


    const deleteAuth = () => {
        axios.delete(`http://localhost:8080/client/deleteAuth/${clientInfo.clientEmail}`)
    }


    const handleSubmitForm = () => {

        axios({
            url: `http://localhost:8080/client/signin`,
            method: 'post',
            data: {
                clientEmail: clientInfo.clientEmail,
                clientName: clientInfo.clientName,
                clientPw: clientInfo.clientPw
            }
        }).then(res => {
            //200번 홈으로 redirect 
            if (res.status === 200) {
                navigator('/')
            }
        }).catch(
            //network error
        );
    }
    return (
        <

            >
            <div className="row mt-4" >
                <div className="col-lg-6 col-md-8 offset-md-2 offset-lg-3">
                    <div className="input-group">
                        <input className="form-control" value={clientInfo.clientEmail} readOnly={isAuth} name="clientEmail" onChange={handleChangeClientInfo} required placeholder="아이디 이메일 형식" />
                        <button type="button" className="btn btn-outline-primary" disabled={isAuth} onClick={handleEmailSend}>{isStatus ? (<>{formatTime()}</>) : (<>이메일 인증</>)}</button>
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
            {
                isStatus === true && (
                    <div className="row mt-2">
                        <div className="col-lg-4  col-md-6 offset-md-4 offset-lg-5 ">
                            <div className="input-group ">
                                <input className="form-control" onChange={handleChangeCode} required placeholder="인증번호 입력" />
                                <button type="button" className="btn btn-outline-secondary" onClick={handleMatchCode}>인증하기</button>
                            </div>
                        </div>
                    </div>
                )
            }
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
                    <button type="button"
                        onClick={(e) => {
                            e.preventDefault(); // 폼이 실제로 전송되는 것을 방지
                            if (clientInfoResult.clientEmailResult && clientInfoResult.clientNameResult && clientInfoResult.clientPwCheckResult && clientInfoResult.clientPwResult) {
                                handleSubmitForm();
                            } else {
                                // 원하는 로직 수행 (예: 에러 메시지 표시 등)
                                console.log('폼 조건 충족 실패');
                            }
                        }}
                        className="btn btn-primary w-100" >가입하기</button>
                </div>
            </div>
        </ >
    );
}