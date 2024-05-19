import React from "react";
import { Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface friendProps {
    clientId: string | undefined
}

const seachIsExistChat =()=>{
    // 찾고 
    
    //없으면 
}

export const FriendDetail: React.FC<friendProps> = ({ clientId }) => {

    return (
        <>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{clientId}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="row">
                    <div className="col">
                        <NavLink onClick={seachIsExistChat} className="btn btn-primary" to="/chatRoom">1:1대화하기</NavLink>
                    </div>
                </div>




            </Offcanvas.Body>
            <div className="offcanvas-footer">
            </div>
        </>
    );
}