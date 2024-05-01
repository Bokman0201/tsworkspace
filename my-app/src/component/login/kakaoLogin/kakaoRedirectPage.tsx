import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const KakaoRedirectPage = () => {

    const location = useLocation();
    const navigator = useNavigate();
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    // 카운터 상태 추가
    const [count, setCount] = useState(0);

    useEffect(() => {
        // 첫 번째 실행 때에만 실행
        if(code){
            console.log(count)
            console.log(code)
            handleOAuthKakao(code);
        }
    }, []) // count와 code가 변경될 때마다 실행

    const handleOAuthKakao = async (code:string) => {
        if(count <1){
            try {
                const response = await axios.post(`http://localhost:8080/oauth/kakao`, { code });
                const data = response.data; // 응답 데이터
                //alert(JSON.stringify(data));
                setCount(1)

                sessionStorage.setItem("info", JSON.stringify(data));
                navigator("/");
            } catch (error) {
                navigator("/error");
            }
        }
    };

    // 첫 번째 실행 때 count를 1로 업데이트


    return (
        <div>
            <div>로그인 중...............</div>
        </div>
    );
}
