import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type signupType = {
    clientEmail: string,
    clientPw: string,
    clientPwCheck: string,
    clientName: string
}

export const Signup: React.FC = () => {

    const navigator = useNavigate();

    const [inputValues, setInputValues] = useState<signupType>(
        {
            clientEmail: '',
            clientPw: '',
            clientPwCheck: '',
            clientName: ''
        }
    );
    const [isSend, setIsSend] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(180);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const startTimer = () => {
        setIsRunning(true);
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isRunning && seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            setIsRunning(false);
        }

        if (seconds === 0) {
            alert("timeout");
            setIsSend(false)
            resetTimer();
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning, seconds]);

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setSeconds(180);
        setIsRunning(false);
    };

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;



    const handleSendEmail = () => {
        if (inputValues.clientEmail.length > 0) {

            setIsSend(!isSend)

            axios({
                url: `http://localhost:8080/client/sendEmail/${inputValues.clientEmail}/${"인증번호"}`,
                method: 'post',
                data: {
                    clientEmail: inputValues.clientEmail,
                    clientPw: inputValues.clientPw,
                    clientName: inputValues.clientName
                }
            }).then(res => {
                if (res.status === 200) {
                    alert("전송 되었습니다.")
                    startTimer();
                }
            }).catch(err => {
                console.error("error")
                if(err.response.status ===400 ){
                    alert("이미 가입된 회원")
                }
            })

        } else {
            alert('email을 입력해주세요');
        }
    }

    const [authCode, setAuthCode] = useState<string>('');

    const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
        setAuthCode(e.target.value)
    }


    const [certifyResult, setCertifyResult] = useState<boolean>(false);
    const hadleCertifying = () => {

        if (authCode.length > 0) {
            axios({
                url: `http://localhost:8080/client/isMatchCode/${inputValues.clientEmail}/${authCode}`,
                method: 'post'
            }).then(res => {
                if (res.status === 200) {
                    alert('인증되었습니다.')
                    successAuth();
                }

            }).catch(err => {
                console.error(err.response, "error")
            })
        }
    }

    //인증 성공시 
    const successAuth = () => {
        setIsSend(false);
        setCertifyResult(true);
        stopTimer();
        deleteAuth();

    }

    const deleteAuth = () => {
        axios.delete(`http://localhost:8080/client/deleteAuth/${inputValues.clientEmail}`)
    }

    const changeInputValues = (e: ChangeEvent<HTMLInputElement>) => {

        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        })
        console.log(inputValues)
    }

    useEffect(() => {

        //여기에 result하면됨

    }, [inputValues]);


    const createClient = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 기본 폼 제출 동작 막기


        axios({
            url: `http://localhost:8080/client/clientSignup`,
            method: 'post',
            data: {
                clientEmail: inputValues.clientEmail,
                clientPw: inputValues.clientPw,
                clientName: inputValues.clientName
            }
        }).then(res => {
            if (res.status === 200) {
                //로그인 페이지로 이동
                alert("가입되었습니다.")
                navigator("/login")
            }
        }).catch(error => {
            if (error.response.status === 400) {
                alert("이미 가입된 회원")
            }
        })



        alert("send")
    }

    return (
        < form onSubmit={createClient}>
            <div className="row">
                <div className="col-lg-4">
                    <div className="input-group">
                        <input type="text" name="clientEmail" value={inputValues.clientEmail} onChange={changeInputValues} className="form-control" disabled={isSend} required placeholder="email을 입력해주세요" />
                        <button type="button" className="btn btn-primary" disabled={isSend || certifyResult} onClick={handleSendEmail}>{isSend ? (<>{minutes}:{remainingSeconds}</>) : (<>인증번호 전송</>)}</button>
                    </div>
                </div>
            </div>
            {isSend && (
                <div className="row mt-2" >
                    <div className="col-lg-3 offset-lg-1">
                        <div className="input-group ">
                            <input type="text" className="form-control" onChange={handleChangeCode} placeholder="인증번호" />
                            <button type="button" className="btn btn-secondary" onClick={hadleCertifying}>인증하기</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="row mt-2">
                <div className="col-lg-4">
                    <input type="password" name="clientPw" value={inputValues.clientPw} onChange={changeInputValues} className="form-control" required placeholder="비밀번호" />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-4">
                    <input type="password" name="clientPwCheck" value={inputValues.clientPwCheck} onChange={changeInputValues} className="form-control" required placeholder="비밀번호확인" />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-4">
                    <input type="text" name="clientName" value={inputValues.clientName} onChange={changeInputValues} className="form-control" required placeholder="이름" />
                </div>
            </div>
            <div className="row mt-2 text-end">
                <div className="col-lg-4">
                    <button type="submit" className="btn btn-secondary ">뒤로가기</button>
                    <button type="submit" className="btn btn-primary ">가입하기</button>
                </div>
                <div className="col-lg-4">
                </div>
            </div>
        </form>
    );
}