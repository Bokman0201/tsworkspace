import React from "react";

export const ProfileImg = () => {

    const handleContextMenu = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault(); // 기본 동작 막기
    }

    return (
        <div className="col d-flex justify-content-center align-items-center selector">
            <img height={90} src="https://dummyimage.com/90x90/000/fff" className="profile-image" alt="Profile" onContextMenu={handleContextMenu} />
        </div>
    );
}