import React from "react";

export const ProfileImg =()=>{

    const handleContextMenu = (e:React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault(); // 기본 동작 막기
    }

    return(
<img src="https://dummyimage.com/70x70/000/fff" style={{borderRadius:"50%", pointerEvents: "none"}} />
        
    );
}