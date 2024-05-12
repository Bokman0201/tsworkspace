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
            git actions test<input type="file"/>
            {memberList.map((member)=>(<div key={member}>{member}</div>))}
        </div>
    );
}
