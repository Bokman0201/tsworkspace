import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home =()=>{

    const  navigator = useNavigate();
    const [memberList, setMemberList]= useState<string[]>([]);

    useEffect(()=>{
        if(memberList.length>1){
            console.log(memberList)
        }
        else{
            for (let i = 1; i <= 20; i++) {
                memberList.push(String(i)); // 또는 memberList.push(i.toString());
            }
        }
        
        navigator('/')
    },[])


    return(
        <div className="">
            친구 요청 페이지 삭제 푸시 알림으로 바꾸기  <br/>
            채팅 파일 전송 구현하기 <br/>
            채팅 멘션 기능 만들기<hr/>

        </div>
    );
}
