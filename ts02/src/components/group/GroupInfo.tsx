import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { groupInfoType, groups } from "../../model/GroupModel";
import { CiLock } from "react-icons/ci";
import { useRecoilState } from "recoil";
import { clientState } from "../../store/ClientStore";


interface CreateGroupProps {
    handleClose: () => void;
    groupId: number;
}
type sendDataType = {
    clientEmail: string,
    groupsId: number,
    groupsPw: string | null
}


export const GroupInfo: React.FC<CreateGroupProps> = ({ handleClose, groupId }) => {
    const [group, setGroup] = useState<groupInfoType>();

    const [clientStore, setClientStore] = useRecoilState(clientState);



    const getGroupsInfo = async () => {

        if (groupId !== null) {
            const res = await axios.get(`http://localhost:8080/groups/groupPreView/${groupId}`);
            setGroup(res.data);
            console.log(res.data)
        }

    }

    useEffect(() => {
        getGroupsInfo();

    }, [])


    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [groupPw, setGroupPw] = useState<string | null>(null);

    const handleChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 0) {
            setGroupPw(null);
        }
        else {
            setGroupPw(e.target.value)
        }
    }
    useEffect(() => {

        console.log(groupPw)
    }, [groupPw])

    useEffect(() => {

        if (isOpen === false) {
            setGroupPw("");
        }
    }, [isOpen])
    const [data, setData] = useState<sendDataType>();

    useEffect(() => {

    }, [])







    const sendJoinData = () => {

        axios({
            url: `http://localhost:8080/groups/joinGroup`,
            method: 'post',
            data: {
                clientEmail: clientStore.clientEmail,
                groupsId: groupId,
                groupsPw: groupPw
            }
        }).then(res => {
            console.log(res.status);
            if (res.status === 200) {
                alert("가입되었습니다.")
            }
        }).catch(err => {
            if (err.response.status === 500) {
                alert("이미 등록된 사용자")
            }
            if (err.response.status === 400) {
                alert("정원 초과")
            }
            if (err.response.status === 502) {
                alert("비밀번호 오류")
            }
        });
    }

    const handleJoinGroup = () => {

        if (group?.groupStatus === "Y") {
            //input tag 열기
            //비밀번호 매치 확인 후 가입
            setIsOpen(true);
            if (isOpen === true) {
                //비번있으면
                sendJoinData();
            }

        } else {
            sendJoinData();
        }

    }


    return (

        <>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="row">
                        <div className="col">
                            <span>{group?.groupStatus === "Y" && (<CiLock />
                            )}</span>
                            {group?.groupsName}
                            <span style={{ fontSize: "18px", color: "gray" }}> ({group?.memberCount}/{group?.groupInfoMaxMember})</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span style={{ fontSize: "14px", color: 'gray' }}>호스트: {group?.groupsHost}</span>
                        </div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Container>

                    <div className="row mb-3">
                        <div className="col">
                            {group?.groupInfoDescription === null ? (<span>등록된 정보가 없습니다.</span>) : (<>{group?.groupInfoDescription}</>)}
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col text-end">
                            <span style={{ fontSize: "15px" }}>개설일: {group?.groupsCreateDate.split(" ")[0]}</span>
                        </div>
                    </div>

                    <div className="row mt-2">
                        {isOpen && (
                            <div className="col text-end">
                                <input value={groupPw !== null ? groupPw : ""} onChange={handleChangePw} type="password" className="form-control" placeholder="비밀번호 입력" />
                            </div>
                        )}
                        <div className="col text-end">
                            {isOpen && (
                                <button className="btn btn-sm me-2 btn-secondary" onClick={() => setIsOpen(false)}>취소</button>
                            )}
                            <button className="btn btn-sm btn-primary" onClick={handleJoinGroup}>가입하기</button>
                        </div>
                    </div>

                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button type="submit" variant="primary" >
                    Save Changes
                </Button>
            </Modal.Footer>
        </>
    );
}