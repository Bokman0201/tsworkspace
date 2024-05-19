import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useModalStatus } from "../store/ModalStore";
import "./group.css";
import axios from "axios";
import useClientInfo from "../store/UserStoer";

const customModalStyles: ReactModal.Styles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        width: "100%",
        height: "100vh",
        zIndex: 1500, // header보다 높게 설정
        position: "fixed",
        top: "0",
        left: "0",
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // 초기 높이 설정
        width: '100%',
        maxHeight: '100vh',
        zIndex: 1600, // header보다 높게 설정
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        backgroundColor: "white",
        justifyContent: "center",
        overflow: "auto",
    },
};

export const CreateGroup: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { clientInfo } = useClientInfo();

    const { status, setStatus, deleteStatus } = useModalStatus();

    const [groupName, setGroupName] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (groupName.length > 0) {
            const result = window.confirm("등록 하시겠습니까?")
            if (result) {
                axios({
                    url: `${process.env.REACT_APP_REST_API_URL}/groups/create`,
                    method: 'post',
                    data: { groupName: groupName, groupHost: clientInfo.clientId }
                }).then(res => {
                    if (res.status === 200) {
                        setGroupName('')
                        alert("등록되었습니다.")
                        deleteStatus()
                    }
                }).catch();
            } else {
                alert("cancel")
            }
        }
    }

    useEffect(() => {
        setIsModalOpen(status)
    }, [status])

    return (
        <div className="">
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={deleteStatus}
                style={customModalStyles}
                ariaHideApp={false}
                contentLabel="Pop up Message"
                shouldCloseOnOverlayClick={false}
            >
                <div className="modal-header">
                    <h2>그룹 생성하기</h2>
                    <button onClick={deleteStatus} className="close-button">X</button>
                </div>

                <div className="modal-body mt-4">
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col">
                                    <input onChange={handleInputChange} value={groupName} className="form-control" placeholder="enter your group name" />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <select className="form-select">
                                        <option>회사</option>
                                        <option>모임</option>
                                        <option>기타</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer mt-4">
                                <button type="submit" className="btn btn-primary">Save changes</button>
                                <button type="button" onClick={deleteStatus} className="ms-2 btn btn-secondary">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
}
