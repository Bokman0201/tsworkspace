import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const AddChat = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달의 열림/닫힘 상태를 관리하는 상태

    const openModal = () => {
        setIsModalOpen(true); // 모달을 열기 위한 상태 업데이트
    };

    const closeModal = () => {
        setIsModalOpen(false); // 모달을 닫기 위한 상태 업데이트
    };

    return (
        <>
            <button onClick={openModal}>+</button>

            <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This is a modal!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}