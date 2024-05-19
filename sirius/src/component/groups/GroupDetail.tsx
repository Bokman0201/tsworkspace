import { useEffect, useState } from "react";
import { UseGroupNo } from "../store/GroupStore";

export const GroupDetail =()=>{
    const {groupNo, setGroupNo} = UseGroupNo();

    useEffect(()=>{
        const sessionNo = sessionStorage.getItem("groupNo")
        if(sessionNo){
            const parseSessionNo = JSON.parse(sessionNo);
            setGroupNo(parseSessionNo);
        }
    },[])


    

    return(
        <div className="row">
            <div className="col">
                {groupNo}
            </div>
        </div>
    );
}