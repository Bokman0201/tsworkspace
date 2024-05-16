import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useModalStatus } from "../store/ModalStore";
import "./group.css";
import { Form } from "react-router-dom";

const customModalStyles: ReactModal.Styles = {
    overlay: {
        backgroundColor: " rgba(0, 0, 0, 0.4)",
        width: "100%",
        height: "100vh",
        zIndex: "10",
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
        zIndex: "150",
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

    const { status, setStatus, deleteStatus } = useModalStatus();

    useEffect(() => {
        setIsModalOpen(status)
    }, [status])

    
    return (
        <div className="modal-parent"> {/* 부모 요소 */}
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
                        <form>
                            <div className="row">
                                <div className="col">
                                    <input className="form-control" placeholder="enter your group name" />
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col ">
                                <select className="form-select">
                                    <option>회사</option>
                                    <option>모임</option>
                                    <option>기타</option>
                                </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className=" btn btn-primary">Save changes</button>
                    <button onClick={deleteStatus} className=" ms-2 btn btn-secondary">Close</button>
                </div>
            </ReactModal >
        </div >
    );
}