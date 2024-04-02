import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import './community.css';
import { useRecoilState } from "recoil";
import { groupNoState } from "../../store/GroupStroe";
import axios from "axios";
import { boardType } from "../../model/communityBoardModel";

type listType = {
    listnum: number,
    listTitle: string,
    listContent: string
}
export const Community: React.FC = () => {

    const pureTextRegex = /<[^>]+>/g;



    const navigator = useNavigate();
    const groupNoStateKey = 'groupId';

    const [groupId, setGroupId] = useRecoilState<number>(groupNoState);

    useEffect(() => {
        const storedGroupId = localStorage.getItem(groupNoStateKey);
        console.log(storedGroupId);
        if (storedGroupId) {
            setGroupId(parseInt(storedGroupId));
        }

        const getBoardList = async () => {
            const res = await axios.get(`http://localhost:8080/list/${storedGroupId}`);
            console.log(res.data)
            setList(res.data);
        }
        getBoardList();
    }, []);


    const [list, setList] = useState<boardType[]>([

    ]);


    const handleGoBoardWrite = () => {
        navigator('/communityBoardWrite')
    }


    const changeHtml = (text: string) => {
        const pureText = text.replace(/<[^>]+>/g, '');
        return pureText;
    }

    const handleNavDetail=(boardId : number|null)=>{

        console.log(boardId)
        if(boardId !==null){
            console.log(boardId)
            sessionStorage.setItem("boardId", boardId.toString());
            navigator("/communityBoardDetail");
        }
    }

    return (

        <div className="row mt-2">
            <div className="col">
                <div className="row ">
                    <div className="col">
                        <div className="border content-title ">
                            <h2>{groupId}Community</h2>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col text-end">
                        <button className="btn btn-sm btn-primary" onClick={handleGoBoardWrite}>게시글 등록</button>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <ul className="community-content">
                            {list.map((content, index) => (
                                <div className="hovering" onClick={()=>handleNavDetail(content.communityBoardId)}>
                                <li key={index}>
                                    <div className="row">

                                        <div className="col">
                                            <span style={{ fontSize: "13px", fontWeight: "600" }}>
                                                {content.communityBoardTitle}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row d-flex">
                                        <div className="col d-flex">
                                            <span style={{
                                                fontSize: "12px",
                                                display: "-webkit-box",
                                                WebkitBoxOrient: "vertical",
                                                WebkitLineClamp: 2,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            }}>
                                                {changeHtml(content.communityBoardContent)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="row" style={{
                                        // borderTop: "1px solid black" /* 테두리 스타일과 색상을 설정합니다. */
                                    }}>
                                        <div className="col text-end">
                                            <span
                                                style={{
                                                    fontSize: "11px",

                                                }}>
                                                조회수: {content.communityBoardReadCount}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                                </div>
                            ))}
                        </ul>


                    </div>
                </div>

            </div>
        </div >
    );
}