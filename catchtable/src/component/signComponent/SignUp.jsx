import { useEffect, useState } from "react";
import { requestIdDuplicate, requestSignUp } from "./SignFunction";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    
    useEffect(() => {
        if (sessionStorage.getItem("clientInfo") !== null) {
            alert("잘못된 접근");
            navigator(-1);
        }
    }, [])

    const navigator = useNavigate();
    const [signUpInfo, setSignUpInfo] = useState({
        clientId: '',
        clientPw: '',
        clientName: '',
        clientNick: '',
        clientType: '사용자'
    }
    );

    const [disableResult, setDisableResult] = useState(false);

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();


        const result = await requestSignUp(signUpInfo);
        console.log(result)
        if (result) {
            alert("가입 완료");
            navigator("/login");
        }
    }

    const handleCheckDuplicate = async () => {
        const res = await requestIdDuplicate(signUpInfo.clientId);
        if (res) {
            const result = window.confirm("사용 가능한 아이디 입니다. 사용하시겠습니까?");
            setDisableResult(result)
        }
    }

    const handleInputChange = (e) => {

        setSignUpInfo({
            ...signUpInfo,
            [e.target.name]: e.target.value
        })

    }
    return (
        <div className="">
            <form onSubmit={handleSubmitSignUp}>
                <div className="row">
                    <div className="col">
                        <div className="input-group">
                            <input required readOnly={disableResult} name="clientId" value={signUpInfo.clientId} type="text" placeholder="Enter your Email" onChange={handleInputChange} />
                            <button disabled={disableResult} type="button" onClick={handleCheckDuplicate}>check</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input required name="clientPw" value={signUpInfo.clientPw} type="password" placeholder="Enter your Password" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input required name="clientName" value={signUpInfo.clientName} type="text" placeholder="Enter your Name" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input required type="text" name="clientNick" value={signUpInfo.clientNick} placeholder="Enter your NickName" onChange={handleInputChange} />
                    </div>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}