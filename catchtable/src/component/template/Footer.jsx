import './Template.css';
import { IoHome } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdChat } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


export const Footer = ()=>{
    const navigator = useNavigate();

    const movePage = (e) => {
        const sessionClient = sessionStorage.getItem("clientInfo");
        let endPoint = e.currentTarget.id; // li 요소의 id 속성을 사용
    
        if (endPoint === '/mypage') {
            if (sessionClient === null) {
                // 클라이언트 정보가 없을 경우 로그인 페이지로 이동
                endPoint = '/login';
            }
        }
    
        navigator(endPoint); // navigator 함수 호출
    }
    
    return (
        <div className="footer">
            <ul className='nav-buttons'>
                <li id={'/'} onClick={movePage}><IoHome size={20}/></li>
                <li id={'/chat'} onClick={movePage}><MdChat size={20}/></li>
                <li id={'/calendar'} onClick={movePage}><FaCalendarAlt  size={20}/></li>
                <li id={'/mypage' } onClick={movePage}><CgProfile size={20}/></li>
            </ul>
        </div>
    );
}