import { ProfileImg } from "../client/img/ProfileImg";
import './friend.css';

export const FriendInfo = ({ friendId }: { friendId: string }) => {

    return (
        <div className="row">
            <div className="col-2  d-flex text-start ">
                <ProfileImg />
            </div>
            <div className="col d-flex align-items-center justify">
                {friendId}
            </div>
            <div className="col d-flex align-items-center justify-content-end">
                <div style={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '10px', }}>
                    <span style={{ fontSize: "12px" }}>나는 아무것도 하기 싫으지</span>
                </div>
            </div>
        </div>
    );
}