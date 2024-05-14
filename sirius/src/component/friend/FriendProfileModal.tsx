import React from "react";
import './friend.css';

interface FriendProfileModalProps {
  isOpen: boolean;
  toggle: () => void;
}

export const FriendProfileModal: React.FC<FriendProfileModalProps> = ({ isOpen, toggle }) => {
  return (
    <div className={isOpen ? "modal modal-open" : "modal"}>
      <div className="modal-content">
        <span className="close" onClick={toggle}>&times;</span>
        <h2>친구 프로필</h2>
        <p>친구의 정보를 여기에 표시합니다.</p>
      </div>
    </div>
  );
};

