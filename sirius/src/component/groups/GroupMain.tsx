import React from "react";
import { GroupChatting } from "./GroupChatting";
import { NavLink, useNavigate } from "react-router-dom";
import { CreateGroup } from "./CreateGroup";

export const GroupsMain: React.FC = () => {
    const navigator = useNavigate();

    return (

        <div className="scroll">
            <NavLink to={"/groupChat"}>go chat</NavLink>

            <CreateGroup/>
        </div>
    );
}