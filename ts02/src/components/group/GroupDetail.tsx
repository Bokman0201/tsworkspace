import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import './group.css';
import { NavLink } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { groupNoState } from "../../store/GroupStroe";

export const GroupDetail: React.FC = () => {
    const groupNoStateKey = 'groupId';

    const [groupId, setGroupId] = useRecoilState<number>(groupNoState);
    
    useEffect(() => {
        const storedGroupId = localStorage.getItem(groupNoStateKey);
        console.log(storedGroupId);
        if (storedGroupId) {
            setGroupId(parseInt(storedGroupId));
        }
    }, []);
    
    // Recoil 상태가 변경될 때마다 로컬  저장


    useEffect(() => {

    }, [])

    return (

        <>
            <div className="row border p-5 bg-image">
                <div className="col-12">
                    <h1 style={{ color: 'white' }}>{groupId}그룹이름</h1>
                </div>
            </div>
            <div className="row  mt-2">
                <div className="col-sm  me-1">
                    <div className="row">
                        <div className="col-12 border">
                            <div className="row">
                                <div className="col">
                                    <span>커뮤니티</span>
                                </div>
                                <div className="col  text-end">
                                    <NavLink to={`/community`}>더보기</NavLink>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    
                                </div>
                            </div>

                        </div>
                        <div className="col-12 border ">
                            상점<br />


                        </div>
                        <div className="col-12 border ">
                            그룹원<br />

                        </div>
                    </div>
                </div>
                <div className="col-sm ">
                    <div className="row">
                        <div className="col-12 border ">
                            채팅<br />
                            1<br />
                            1<br />
                            1<br />
                        </div>
                        <div className="col-12 border ">
                            여긴뭐하지<br />

                        </div>
                        <div className="col-12 border ">
                            여긴 뭐하지<br />

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}