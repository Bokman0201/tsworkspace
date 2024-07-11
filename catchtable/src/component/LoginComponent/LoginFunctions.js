import axios from 'axios';

// 로그인 처리 
export const requestLogin = async (loginInfo) => {
    try {
        const res = await axios({
            url: `${process.env.REACT_APP_REST_API_URL}/client/login`,
            method: 'post',
            data: loginInfo
        });
        
        if (res.status === 200) {
            sessionStorage.setItem("clientInfo", JSON.stringify(res.data));
            return true;  // 성공 시 true 반환
        }
    } catch (err) {
        console.error("error" + err);
        return false;  // 실패 시 false 반환
    }
};