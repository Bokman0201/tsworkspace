import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const ResModal = ({ show, setShow, reservationData }) => {

    // 여기서 정보 다 받아서 aixos로 전송하기 
    // const [reservationData,setReservationData] = useState({
    //     reservationNo: 0,
    //     reservationClient: '',
    //     reservationRestaurant: 0,
    //     reservationTalbe: 0,
    //     reservationDatetime: '',
    //     reservationCapacity: 0,
    //     reservationMemo: '',
    //     reservationMenu: 0,
    //     reservationTargetDate: ''
    // });


    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>예약 진행</Modal.Title>
            </Modal.Header>

            {/* 예약 메모 작성 */}
            <Modal.Body>
                {reservationData.reservationCapacity} 명
                {reservationData.reservationRestaurant}
                {reservationData.reservationClient}
                {reservationData.reservationTargetDate}


                <input type="text" className='form-control' />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
            </Modal.Footer>
        </Modal>
    );
}