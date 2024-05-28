import React, { Dispatch } from "react";
import { Modal, Offcanvas } from "react-bootstrap";
import './Header.css';
interface modalProps {
    modalIsOpen: boolean,
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const HeaderModal: React.FC<modalProps> = ({ modalIsOpen, setModalIsOpen }) => {

    return (
        <Offcanvas placement={"end"} backdrop="static" show={modalIsOpen} onHide={() => setModalIsOpen(false)} className="">
            <Offcanvas.Header closeButton >
                <Offcanvas.Title>방 설정</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="row">
                    <div className="col"><span></span></div>
                </div>





            </Offcanvas.Body>
            <div className="">1asdfasd'</div>
            
        </Offcanvas>
    );
}