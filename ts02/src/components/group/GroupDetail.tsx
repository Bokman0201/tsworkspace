import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import './group.css';

export const GroupDetail: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const groupId = searchParams.get('groupId');


    useEffect(() => {

    }, [])

    return (

        <>
            <div className="row border p-5 bg-image">
                <div className="col-12">
                    <h1 style={{color:'white'}}>{groupId}그룹이름</h1>
                </div>
            </div>
            <div className="row  mt-2">
                <div className="col-sm  me-1">
                    <div className="row">
                        <div className="col-12 border">
                        커뮤니티<br/>
                        1<br/>
                        1<br/>
                        </div>
                        <div className="col-12 border ">
                        상점<br/>
                        2<br/>
                        2<br/>

                        </div>
                        <div className="col-12 border ">
                        그룹원<br/>
                        3<br/>
                        3<br/>

                        </div>
                    </div>
                </div>
                <div className="col-sm ">
                    <div className="row">
                        <div className="col-12 border ">
                        채팅<br/>
                        1<br/>
                        1<br/>
                        1<br/>
                        </div>
                        <div className="col-12 border ">
                        여긴뭐하지<br/>

                        </div>
                        <div className="col-12 border ">
                        여긴 뭐하지<br/>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}