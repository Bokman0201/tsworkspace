import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { CreateGroup } from "./CreateGroup";
import axios from "axios";
import { useRecoilState } from "recoil";
import { clientState } from "../../store/ClientStore";
import { GroupInfo } from "./GroupInfo";
import { groups } from "../../model/GroupModel";
import { CiLock } from "react-icons/ci";




export const GroupList = () => {
    const [groupList, setGroupList] = useState<groups[]>([]);
    const [client, setClient] = useRecoilState(clientState);
    const [groupId, setGroupId] = useState<number | null>(null);


    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)


    };
    const handleShow = () => setShow(true);


    const getGroupList = async () => {
        try {
            const res = await axios.get('http://localhost:8080/groups/groupList');
            console.log(res.data);
            setGroupList(res.data);
        } catch (error) {
            console.error('Error fetching group list:', error);
        }
    };


    useEffect(() => {
        getGroupList();
    }, [])

    useEffect(() => {
        if (show === false) {
            setGroupId(null)
        }
    }, [show])




    const formatDate = (date: any) => {
        var today = new Date();

        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);



        var hours = ('0' + today.getHours()).slice(-2);
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2);

        var timeString = hours + ':' + minutes + ':' + seconds;

        console.log(timeString);

        var dateString = year + '-' + month + '-' + day;

        console.log(dateString);

        return dateString;
    };


    const handleClickGroup = (id: number) => {
        setGroupId(id)
        setShow(true);
    }




    //여기는 css 용

    const handleHover = (index: number) => {
        setHoveredIndex(index);
    };

    const handleLeave = () => {
        setHoveredIndex(null);
    };
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const generateRowStyle = (index: number) => {
        const baseStyle = {
            backgroundColor: index === hoveredIndex ? '#f0f0f0' : '',
        };

        return baseStyle;
    };

    return (

        <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
                <div>
                    <div className="mt-4">
                        <div className="row">
                            <div className="col text-end">
                                <button type="button" onClick={handleShow} className="btn btn-sm btn-secondary">그룹 만들기</button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <div className="input-group">
                                <input className="form-control" />
                                <button className="btn btn-primary">검색</button>
                            </div>
                        </div>
                    </div>
                    <Container>
                        {groupList.map((group, index) => (
                            <div className="row p-2 mt-2 border rounded-3"
                                onMouseEnter={() => handleHover(index)}
                                onMouseLeave={handleLeave}
                                style={generateRowStyle(index)}
                                onClick={() => handleClickGroup(group.groupsId)}
                                key={index}>
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            {group.groupStatus === "Y" && (<CiLock />)}
                                            <span>{group.groupsName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col text-end">
                                    <div className="row">
                                        <div className="col">
                                            <span style={{ fontSize: "12px" }}>
                                                {group.groupsHost}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <span style={{ fontSize: "12px" }}>{group.groupsCreateDate.split(' ')[0]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Container>
                </div>
                {/* 
                    1.모달 만들어서 그룹만들기에 사용
                    2.그룹누르면 그룹의 정보 보이기 
                    */}


                <Modal show={show} onHide={handleClose}>
                    {groupId === null ? (
                        <CreateGroup handleClose={handleClose} getGroupList={getGroupList} />
                    ) : (
                        <GroupInfo handleClose={handleClose} groupId={groupId} />
                    )}

                </Modal>
            </div>
        </div>

    );
}