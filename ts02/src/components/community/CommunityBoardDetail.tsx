import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { groupNoState } from "../../store/GroupStroe";
import axios from "axios";
import { boardType } from "../../model/communityBoardModel";
import { clientState } from "../../store/ClientStore";
import './communityBoardStyle.css';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";



type replyType = {
    replyId: number,
    replyParentId: number | null,
    boardId: number,
    replyWriter: string,
    replyContent: string,
    replyUpdateDate: string
}

export const CommunityBoardDetail = () => {

    const [user, setUser] = useRecoilState(clientState);

    const boardIdStateKey = 'boardId';
    const boardId = sessionStorage.getItem(boardIdStateKey);


    //댓글 리스트 임시
    const [replyList, setReplyList] = useState<replyType[]>([]);

    useEffect(() => {
        getReplyList();
    }, []);
    const getReplyList = async () => {

        try {
            const res = await axios.get(`http://localhost:8080/replyList/${boardId}`);
            setReplyList(res.data)

        }
        catch {
            console.error("network error");
        }

    }





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
        getCommentList()
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


    //댓글 작성

    const [replyContent, setReplyContent] = useState<string | undefined>();
    //댓글 저장
    const handleReplyWrite = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReplyContent(e.target.value);
    }

    //통신
    const replyWrite = () => {

        const boardId = sessionStorage.getItem(boardIdStateKey);

        axios({
            url: `http://localhost:8080/replyWrite`,
            method: 'post',
            data: {
                replyWriter: user.clientEmail,
                replyContent: replyContent,
                replyParentId: null,
                boardId: boardId
            }
        }).then(res => {
            console.log(res.status)

            if (res.status === 200) {
                getReplyList();
                setReplyContent("");
                //리스트 리로드
            }






        }).catch();
    }

    //작성시 댓글창 새로고침


    //좋아요


    //대댓글

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [commentContent, setCommentContent] = useState<string>("");

    const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {

        setCommentContent(e.target.value)
    }

    const commentWrite = () => {

        const boardId = sessionStorage.getItem(boardIdStateKey);

        if (selectedId) {
            axios({
                url: `http://localhost:8080/replyWrite`,
                method: 'post',
                data: {
                    replyWriter: user.clientEmail,
                    replyContent: commentContent,
                    replyParentId: selectedId,
                    boardId: boardId
                }
            }).then(res => {
                console.log(res.status)

                if (res.status === 200) {
                    getReplyList();
                    setReplyContent("");
                    //리스트 리로드
                }
            }).catch();
        }
    }

    const handleComment = (replyId: number) => {
        if (replyId === selectedId) {
            setSelectedId(null);
        }
        else {
            setSelectedId(replyId);
        }
    }


    //대댓글 리스트 
    const [commentList, setCommentList] = useState<replyType[]>([]);
    const getCommentList = async () => {

        try {
            const res = await axios.get(`http://localhost:8080/commentList/${boardId}`);
            setCommentList(res.data)
            console.log(res.data)
        } catch {

        }
    }


    //댓글 수정
    const [selectedReplyIndex, setSelectedReplyIndex] = useState<number | null>(null);

    const handleUpdateReplyContent = (replyIndex: number) => {
        if (replyIndex === selectedReplyIndex) {
            setSelectedReplyIndex(null); // 같은 댓글을 두 번 클릭하면 수정 모드를 끄도록 토글
        } else {
            setSelectedReplyIndex(replyIndex);
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const updatedReplyList = replyList.map(reply => {
            if (reply.replyId === selectedReplyIndex) {
                return { ...reply, replyContent: e.target.value };
            }
            return reply;
        });
        setReplyList(updatedReplyList);
    };

    const saveChangeReplyData = () => {
        const origin = replyList.find(reply => reply.replyId === selectedReplyIndex);

        console.log(origin)

        axios({
            url: `http://localhost:8080/replyUpdate`,
            method: 'put',
            data: origin
        }).then(res => {
            console.log(res.status)
            setSelectedReplyIndex(null);
            getReplyList();
        }).catch();
    }


    //댓글 삭제
    const deleteReply = (replyId: number) => {
        console.log(replyList.find(reply => reply.replyId === replyId))
        const result = window.confirm("삭제 하시겠습니까?");

        if (result) {
            axios({
                url: `http://localhost:8080/delete/${replyId}`,
                method: 'delete',
            }).then(res => {
                getReplyList();
            })
            //삭제하고 리스트 초기화
        }
        else {
            alert("취소되었습니다.")
        }
    }


    //스크랩
    const [isLike, setIsLike] = useState<boolean|undefined>();

    useEffect(()=>{
        getStatus();
    },[user])

    const getStatus =async()=>{

        if(user.clientEmail){
            const res = await axios.get(`http://localhost:8080/getLikeStatus/${boardId}/${user.clientEmail}`)
            setIsLike(res.data);
        }
    }

    const handleLike=()=>{
        axios({
            url:`http://localhost:8080/boardLike`,
            method:'post',
            data:{
                boardId:boardId,
                clientEmail: user.clientEmail
            }
        }).then(res=>{
            console.log(res.data);
            setIsLike(res.data)
        }).catch();
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
            <div style={{ borderBottom: "1px solid", padding: '0.3em' }}
                className="row mt-2 ">
                <div className="col-12 text-center">
                    <h2>{board?.communityBoardTitle}</h2>
                </div>
                <div className="col-8">
                   <span className="font-sm pointer"> 작성자 : {user.clientEmail}</span>
                </div>
                <div className="col-4 text-end">
                <span className="pointer" onClick={handleLike}>
                    {isLike?(
                        <AiOutlineLike/>
                    ):(
                        <AiFillLike/>
                    )}
                    
                    </span>
                </div>
            </div>


            {/* 내글 수정 삭제 */}
            <div className="row mt-3">
                <div className="col">
                    <div>{innerHtmlContent()}</div>
                </div>
            </div>


            <div style={{ border: "1px solid", padding: "0.5em", borderRadius: "0.5em" }}>
                <div className="row">
                    <div className="col">
                        <textarea
                            style={{ resize: "none" }}
                            onChange={handleReplyWrite}
                            value={replyContent}
                            className="form-control" placeholder="댓글을 입력해 주세요"></textarea>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col text-end">
                        <button className="btn btn-success" onClick={replyWrite}>댓글달기</button>
                    </div>
                </div>
            </div>

            {/* <div className="row mt-2">
                <div className="col text-end ">
                    <span className="pointer" >{isOpen ? (
                        "댓글닫기"
                    ) : (
                        "댓글보기"
                    )}</span>

                </div>
            </div> */}

            <div className="row mt-4 mb-3">
                <div className="col">
                    <span onClick={toggleReplyList}>{replyList.length}개의 댓글</span>
                </div>
                <div className="col-2">
                    <div className="custom-dropdown">
                        <div className="selected-option" onClick={() => setIsDropDown(!isDropDown)} style={{ cursor: "pointer" }}>
                            {selectedOption || "정렬"}
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
                            <div className="border mt-2 p-1" key={index}>
                                <div className="row">
                                    <div className="col-8">이미지/{reply.replyWriter}</div>
                                    <div className="col text-end"> {reply.replyUpdateDate.split(" ")[0]}</div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        {selectedReplyIndex === reply.replyId ? (
                                            <div className="input-group mt-2">
                                                <textarea className="form-control" value={reply.replyContent} onChange={(e) => handleInputChange(e)} />
                                                <button type="button" className="btn btn-primary" onClick={saveChangeReplyData}>수정</button>
                                            </div>
                                        ) : (
                                            <pre>{reply.replyContent}</pre>
                                        )}
                                    </div>
                                </div>

                                {/* 내가 작성한 댓글 수정 삭제 */}

                                <div className="row">
                                    {selectedReplyIndex === null && reply.replyWriter === user.clientEmail ? (
                                        <div className="col text-start">
                                            <span className="me-2 btn btn-outline-primary btn-sm pointer" onClick={() => handleUpdateReplyContent(reply.replyId)}>수정</span>
                                            <span className="btn btn-outline-danger btn-sm pointer" onClick={() => deleteReply(reply.replyId)}>삭제</span>
                                        </div>

                                    ) : (
                                        <></>
                                    )}
                                    <div className="col  text-end">
                                        <span className="me-2" onClick={() => handleComment(reply.replyId)}>댓글달기</span>
                                        <span className="red">
                                            <FaHeart />
                                        </span>
                                    </div>
                                </div>

                                {selectedId === reply.replyId && (
                                    <div className="row mt-2">
                                        <div className="col-11 offset-1">
                                            <textarea style={{ resize: "none" }} onChange={handleChangeComment} value={commentContent} className="form-control" />
                                        </div>
                                        <div className="col text-end mt-2 ">
                                            <button className="btn btn-sm btn-primary" onClick={commentWrite}>등록</button>
                                        </div>
                                    </div>
                                )}

                                {/* 대댓글 목록 */}
                                <div className="container mt-2">
                                    {commentList
                                        .filter(comment => comment.replyParentId === reply.replyId)
                                        .map((comment, commentIndex) => (
                                            <div className="row border" key={commentIndex}>
                                                <div className="col">
                                                    {comment.replyContent}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}

        </div>

    );
}