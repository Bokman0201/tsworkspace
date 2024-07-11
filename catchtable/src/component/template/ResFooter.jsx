import { useEffect, useState } from 'react';
import { ReservationOffcanvas } from '../RestaurantComponent/offcanvas/ReservationOffcanvas';
import './Template.css';
import { ResModal } from '../RestaurantComponent/restaurantModal/ResModal';
import { useRecoilState } from 'recoil';
import { clientState } from '../../recoil/clientStore';
import { selectedDateState, selectedTimeState } from '../../recoil/ReservationStore';

export const ResFooter = ({ resDetailInfo, formattedDate }) => {
    const [client, setClient] = useRecoilState(clientState)

    const [isActive, setIsActive] = useState(false);

    const toggleOffcanvas = () => {
        console.log(isActive)
        setIsActive(!isActive);
    };
    
    const [selectedDate , setSelectedDate] =useRecoilState(selectedDateState)
    const [selectedTime, setSelectedTime] = useRecoilState(selectedTimeState)
    const formatDate = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day} ${selectedTime}`


    const [show, setShow] = useState(false);

    



    const [reservationData, setReservationData] = useState({
        reservationNo: 0,
        reservationClient: '',
        reservationRestaurant: sessionStorage.getItem("resNo"),
        reservationTalbe: 0,
        reservationDatetime: '',
        reservationCapacity: 2,// 기본값 2 명 
        reservationMemo: '',
        reservationMenu: 0,
        reservationTargetDate: formatDate
    });


    useEffect(()=>{
        setReservationData({...reservationData,
            reservationClient:client.clientId,
            reservationTargetDate:formatDate
        })



    },[formatDate,client])


    return (
        <>
            <div className="footer">
                <ul className='nav-buttons nav-res-button'>
                    <li id={'/mypage'} onClick={toggleOffcanvas} >{reservationData.reservationDatetime}예약하기</li>
                </ul>
            </div>
            <ReservationOffcanvas reservationData={reservationData} setReservationData={setReservationData} formattedDate={formattedDate} isActive={isActive} setIsActive={setIsActive} resDetailInfo={resDetailInfo} show={show} setShow={setShow} />
            <ResModal show={show} setShow={setShow} reservationData={reservationData} />
        </>
    )
}