import React from "react";
import { Offcanvas } from "react-bootstrap";

interface friendProps {
    clientId: string | undefined
}

export const FriendDetail: React.FC<friendProps> = ({ clientId }) => {

    return (
        <>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{clientId}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
            <div className="offcanvas-footer">
            </div>
        </>
    );
}