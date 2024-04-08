import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { groupNoState } from "../../store/GroupStroe";
import axios from "axios";
import { boardType } from "../../model/communityBoardModel";
import { clientState } from "../../store/ClientStore";
import './communityBoardStyle.css';



type replyType = {
    replyWriter: string,
    replyContent: string,
    replyUpdateDate: string
}

export const CommunityBoardDetail = () => {

    const [user, setUser] = useRecoilState(clientState);

    const boardIdStateKey = 'boardId';


    //댓글 리스트 임시
    const [replyList, setReplyList] = useState<replyType[]>([
        {
            replyWriter: "User1",
            replyContent: "test1",
            replyUpdateDate: "2024-04-08"
        },
        {
            replyWriter: "User2",
            replyContent: "test2!",
            replyUpdateDate: "2024-04-07"
        },
        {
            replyWriter: "User3",
            replyContent: "test3.",
            replyUpdateDate: "2024-04-06"
        }
    ]);


    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleReplyList = () => {
        setIsOpen(!isOpen);
    }


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



    //버튼 드랍다운

    const [isDropDown, setIsDropDown] = useState<boolean>(false);

    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
        setIsDropDown(false)
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                </div>
            </div>
            <div className="row mt-2 ">
                <div className="col text-center"
                    style={{ borderBottom: "1px solid", padding: '0.3em' }}
                >
                    <h2>{board?.communityBoardTitle}</h2>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col"
                >
                    <div>{innerHtmlContent()}</div>
                </div>
            </div>


            <div style={{border:"1px solid", padding:"0.5em", borderRadius: "0.5em"  }}>
                <div className="row">
                    <div className="col">
                        <textarea className="form-control" placeholder="댓글을 입력해 주세요"></textarea>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col text-end">
                        <button className="btn btn-success">댓글달기</button>
                    </div>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col text-end ">
                    <span className="pointer" onClick={toggleReplyList}>{isOpen ? (
                        "댓글닫기"
                    ) : (
                        "댓글보기"
                    )}</span>

                </div>
            </div>

            <div className="row">
                <div className="col">
                    <span>{replyList.length}개의 댓글</span>
                </div>
                <div className="col-2">
                    <div className="custom-dropdown">
                        <div className="selected-option" onClick={() => setIsDropDown(!isDropDown)}>
                            {selectedOption || "Choose an option"}
                        </div>
                        {/* 드롭다운 메뉴 */}
                        <div className="dropdown-menu" style={{ display: isDropDown ? "block" : "none" }}>
                            {/* 각 옵션을 클릭할 때 handleOptionChange 함수를 호출하고 해당 옵션을 전달 */}
                            <div className="option" onClick={() => handleOptionChange("option1")}>Option 1</div>
                            <div className="option" onClick={() => handleOptionChange("option2")}>Option 2</div>
                            <div className="option" onClick={() => handleOptionChange("option3")}>Option 3</div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen ? (
                <div className="row mt-3">
                    <div className="col">
                        {replyList.map((reply, index) => (
                            <>
                                <div key={index} className="row mt-1">
                                    <div className="col">이미지/{reply.replyWriter} / 작성시간</div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        {reply.replyContent}
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            ) : (<></>)}
        </div>

    );
}