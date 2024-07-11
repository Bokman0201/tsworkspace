import React, { useState, useEffect, useRef } from 'react';
import './offcanvas.css';
import Calendar from '../calendar/Calendar';
import { useRecoilState } from 'recoil';
import { selectedDateState, selectedTimeState } from '../../../recoil/ReservationStore';
import { getTables } from '../RestautantFunction';
import { useNavigate } from 'react-router-dom';

export const ReservationOffcanvas = ({ setReservationData,reservationData ,isActive, setIsActive, resDetailInfo, formattedDate ,show, setShow}) => {
    const [height, setHeight] = useState('auto');
    const containerRef = useRef(null);

    const navigator = useNavigate();

    useEffect(() => {
        if (containerRef.current) {
            setHeight(containerRef.current.scrollHeight);
        }
    }, [isActive]);

    const generateTimeSlots = (openTime, closeTime) => {
        const timeSlots = [];

        let [openHours, openMinutes] = openTime.split(':').map(Number);
        let [closeHours, closeMinutes] = closeTime.split(':').map(Number);

        while (openHours < closeHours || (openHours === closeHours && openMinutes <= closeMinutes)) {
            const hours = openHours.toString().padStart(2, '0');
            const minutes = openMinutes.toString().padStart(2, '0');
            timeSlots.push(`${hours}:${minutes}`);

            openMinutes += 60;
            if (openMinutes >= 60) {
                openMinutes -= 60;
                openHours += 1;
            }
        }

        return timeSlots;
    };

    //  만약에 오늘이면 타임슬롯을 지금 시간부터 오늘이 아니면 전체 시간
    const timeSlots = generateTimeSlots(resDetailInfo.restaurantDto.resOpenTime, resDetailInfo.restaurantDto.resCloseTime);



    const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState)

    const [selectedTime, setSelectedTime] = useRecoilState(selectedTimeState);

    const [selectedCapacity, setSelectedCapacity] = useState(2);

    const [maxCapacity, setMaxCapacity] = useState(15);

    const personsArray = Array.from({ length: maxCapacity }, (_, index) => index + 1);
    const sessionClientInfo = sessionStorage.getItem("clientInfo")


    const handleSelectTime = (time) => {
        setSelectedTime(time)
        console.log(selectedDate.day)
        console.log(selectedTime)
        setIsActive(false);

        if(sessionClientInfo){
            setShow(true)
        }else{
           const result = window.confirm("로그인이 필요합니다.")

           if(result ){
            navigator('/login')
           }
        }


    }

    const handleSelectCapacity = (cap) => {
        setSelectedCapacity(cap)
        setReservationData({...reservationData,
            reservationCapacity:cap
         })
    }

    //날짜 변하면 선택 초기화
    useEffect(() => {
        setSelectedTime(null)
        setSelectedCapacity(2)

    }, [selectedDate])

    const handleGetTable = async () => {
        const resNo = sessionStorage.getItem("resNo");

        const res = await getTables(resNo, selectedCapacity);
        console.log(res.data)
    }

    useEffect(() => {
        handleGetTable();
    }, [selectedCapacity])
    return (
            <div
                className={`offcanvas-bottom ${isActive ? 'active' : ''}`}
                style={{ height: isActive ? height + 5 : '0' }}
                ref={containerRef}
            >
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <Calendar setIsActive={setIsActive} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='slot-container'>
                                {personsArray.map(person => (
                                    <div className="time-slots-wrapper" onClick={() => handleSelectCapacity(person)} key={person}>
                                        <div className={`capacity-slot ${person === selectedCapacity ? 'capacity-slot-selected' : ''}`}>{person}명</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className="slot-container ">
                                {timeSlots.map((time, idx) => {
                                    if (selectedDate.year === formattedDate.year &&
                                        selectedDate.month === formattedDate.month &&
                                        selectedDate.day === formattedDate.day &&
                                        time.split(":")[0] < formattedDate.time.split(":")[0] + 1) {
                                        return null;
                                    }
                                    return (
                                        <div className="time-slots-wrapper" key={idx} onClick={() => handleSelectTime(time)}>
                                            <div className={`time-slot ${time === selectedTime ? 'time-slot-selected' : ''}`}>{time}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='row '>
                        <button className='btn cancel-button  w-100' onClick={() => setIsActive(!isActive)}>닫기</button>
                    </div>
                </div>
            </div>

    );
}
