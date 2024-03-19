import axios from "axios";
import { type } from "os";
import { ChangeEvent, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from "recoil";
import { clientState } from "../../store/ClientStore";
interface CreateGroupProps {
    handleClose: () => void;
    getGroupList: ()=> void;
}


type createGroupType = {
    groupsPw:string|null,
    groupsName:string,
    groupsHost:string,
};

export const CreateGroup: React.FC<CreateGroupProps> = ({ handleClose ,getGroupList}) => {
    const [client, setClient] = useRecoilState(clientState);

    const [groupInfo , setGroupInfo ] = useState<createGroupType>({
        groupsPw:'',
        groupsName:'',
        groupsHost:client.clientEmail,
    });


    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked)
    }


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupInfo({...groupInfo, 
        [e.target.name] : e.target.value
        })

    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        axios({
            url:`http://localhost:8080/groups/createGroup`,
            method:'post',
            data:{
                groupsDto: groupInfo,
                groupTagDto: {
                  groupTagId: 0,
                  groupTagName: "string"
                }
              }
        }).then(res=>{
            if(res.status ===200 ){
                alert("등록되었습니다.")
                handleClose();
                getGroupList();
            }
        }).catch(err=>{
            if(err.response.status ===500){
                alert("이미 존재하는 그룹입니다.")
            }
        });
    }

    useEffect(()=>{
        if(!isChecked){
            
            setGroupInfo({...groupInfo, 
            groupsPw:null
            })
            }
    },[isChecked])

    return (
        <>

            <form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>create group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col text-end">
                            비공개그룹 <input onChange={handleCheckbox} type="checkbox" />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <input className="form-control" value={groupInfo.groupsName} name="groupsName" onChange={handleInputChange} required placeholder="그룹명" />
                        </div>
                    </div>
                    {isChecked && (
                        <div className="row mt-2">
                            <div className="col">
                                <input className="form-control" name="groupsPw" value={groupInfo.groupsPw === null ? ('') :(groupInfo.groupsPw) } onChange={handleInputChange} placeholder="비밀번호" />
                            </div>
                        </div>
                    )}
                    <div className="row mt-2">
                        <div className="col">
                            <input className="form-control"   placeholder="태그" />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </form>
        </>
    );
}