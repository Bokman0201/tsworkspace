import { ChangeEvent } from "react";
import { FaGit } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";


export const LoginPage = () => {

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }

    const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {

        const id = event.currentTarget.id;

        window.location.href = `http://localhost:8080/oauth/${id}`;
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // 폼 제출 후 할 작업

        
      };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

            <div className="container ">
                <form  onSubmit={handleSubmit}>
                    <div className="row mt-2">
                        <div className="col-lg-6 offset-lg-3">
                            <input type="email" required className="form-control" onChange={inputChange} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-lg-6 offset-lg-3">
                            <input type="password" className="form-control" />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-lg-6 offset-lg-3">
                            <button className="btn w-100 btn-primary">로그인</button>
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