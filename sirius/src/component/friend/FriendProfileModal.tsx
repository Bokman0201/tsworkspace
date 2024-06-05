import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import './friend.css';
import { Button, Modal } from "react-bootstrap";
import { useModalStatus } from "./Modal";
import { ProfileImg } from "../client/img/ProfileImg";
import { relative } from "path";
import { IoIosCamera } from "react-icons/io";
import './modal.css';
import useClientInfo from "../store/UserStoer";
import axios from "axios";



export const FriendProfileModal: React.FC = () => {

  const { ModalIsOpen, deleteModalIsOpen, setModalIsOpen } = useModalStatus();

  const { clientInfo } = useClientInfo();
  const [nickName, setNickName] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    if (clientInfo.clientId !== '') {
      setNickName(clientInfo.clientNick)
    }

  }, [clientInfo, ModalIsOpen])

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);

  const selectPicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      console.log('Selected File:', selectedFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setFileContent(event.target.result);
          console.log('File Content (base64):', event.target.result?.toString().substring(0, 100)); // 파일 내용의 일부만 출력 (처음 100자)
        }
      };
      reader.readAsDataURL(selectedFile); // 여기서 readAsDataURL은 이미지 파일의 경우 base64 인코딩된 문자열로 읽습니다.
    }
  };

  const sendUpdateData = () => {

    const formData = new FormData();
    if (file !== null) {
      formData.append('profileImg', file);
    }
    formData.append('statusMessage', statusMessage);
    formData.append('nickName', nickName);
    formData.append('clientId', clientInfo.clientId);


    axios({
      url: `${process.env.REACT_APP_REST_API_URL}/api/update`,
      method: 'put',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        // handle success
        console.log(response);
        if(response.status ===200){
          deleteModalIsOpen();
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  return (
    <Modal show={ModalIsOpen} onHide={deleteModalIsOpen} centered>
      <Modal.Header closeButton>
        <Modal.Title>프로필 편집</Modal.Title>
      </Modal.Header>
      <Modal.Body className="centered-modal-body">
        <div style={{ position: "relative", display: "inline-block" }}>

          {fileContent ? (
            <div className="col d-flex justify-content-center align-items-center selector">
              <img className="profile-image" src={fileContent.toString()} alt={file?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <ProfileImg />
          )}
          <div className="absolute-button">
            <IoIosCamera color="black" size={15} onClick={handleInputFileSelect} />
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={selectPicture}
        />

        <div className="row">
          <div className="col">
            <input value={nickName} type="text" onChange={(e) => setNickName(e.target.value)} className="custom-input" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input type="text" onChange={(e)=>setStatusMessage(e.target.value)}  className="custom-input" placeholder="상태메세지" />
          </div>
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={deleteModalIsOpen}>
          Close
        </Button>
        <Button variant="primary" onClick={sendUpdateData}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

