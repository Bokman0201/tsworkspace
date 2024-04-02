import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { groupNoState } from "../../store/GroupStroe";
import axios from "axios";
import { boardType } from "../../model/communityBoardModel";

export const CommunityBoardDetail = () => {

    const boardIdStateKey = 'boardId';



    const [board, setBoard] = useState<boardType>();
    useEffect(() => {
        const boardId = sessionStorage.getItem(boardIdStateKey);
        console.log(boardId);

        const getDetail = async () => {
            const res = await axios.get(`http://localhost:8080/detail/${boardId}`)
            setBoard(res.data);
        }

        getDetail();


    }, []);

    const innerHtmlContent = () => {
        // board가 존재하고 communityBoardContent가 존재한다면 해당 내용을 반환합니다.
        if (board && board.communityBoardContent) {
            return (
                <div dangerouslySetInnerHTML={{ __html: board.communityBoardContent }} />
            );
        } else {
            return null; // board가 존재하지 않거나 communityBoardContent가 없을 경우 null을 반환합니다.
        }
    }
    return (
        <div className="container">
            <div className="row mt-2 ">
                <div className="col text-center"
                    style={{borderBottom:"1px solid", padding:'0.3em'}}
                >
                    <h2>{board?.communityBoardTitle}</h2>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <div>{innerHtmlContent()}</div>
                </div>
            </div>
        </div>
    );
}