import axios from "axios";
import { useRecoilState } from "recoil";
import { clientState } from "../../store/ClientStore";
import { useEffect, useState } from "react";
import { groupInfoType } from "../../model/GroupModel";
import { useNavigate } from "react-router-dom";

export const MyGroup = () => {

    const [client, setClient] = useRecoilState(clientState);
    const [groupList, setGroupList] = useState<groupInfoType[]>([]);
    const navigator =useNavigate();
    const getMygroupList = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/groups/myGroup/${client.clientEmail}`);
            console.log(res.data);
            setGroupList(res.data);
        } catch {

        }
    }

    useEffect(() => {
        if (client.clientEmail !== "")
            getMygroupList();
        console.log(client);
    }, [client])


    const handleMoveDetail =(groupId:number)=>{
        console.log(groupId)
        navigator(`/groupDetail?groupId=${groupId}`);
    }


    //css
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
                {groupList.map((group, index) => (
                    <div className="row p-2 mt-2 border rounded-3 "
                        onMouseEnter={() => handleHover(index)}
                        onMouseLeave={handleLeave}
                        style={generateRowStyle(index)}
                        key={index}>

                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <span>{group.groupsName}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <span style={{ fontSize: "15px" }}>{group.groupsHost}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col text-end">
                            <button className="btn btn-primary btn-sm" onClick={()=>handleMoveDetail(group.groupsId)}>이동</button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}