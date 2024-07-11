import { useEffect, useState } from "react";
import { getResDetail } from "./RestautantFunction";
import ResCarousel from "./ResCarousel";
import { ResFooter } from "../template/ResFooter";
import "./RestaurantDetail.css";
import React from "react"
import { selectedDateState } from "../../recoil/ReservationStore";
import { RecoilState, useRecoilState, useResetRecoilState } from "recoil";

export const RestaurantDetail = () => {
    const resNo = sessionStorage.getItem("resNo");

    const [formattedDate, setFormattedDate] = useState({
        year: '',
        month: '',
        day: '',
        time: ''
    });

    const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState)

    useEffect(() => {
        const updateDate = () => {
            const today = new Date();
            const hours = String(today.getHours()).padStart(2, '0');
            const minutes = String(today.getMinutes()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더한 후 두 자리로 맞춤
            const day = String(today.getDate()).padStart(2, '0'); // 일도 두 자리로 맞춤
        
            setFormattedDate({
                year: today.getFullYear(),
                month: month,
                day: day,
                time: `${hours}:${minutes}`
            });
            console.log(`${today.getFullYear()} ${month} ${day} ${hours}:${minutes}`);
        };

        // 최초 한번 업데이트
        updateDate();

        // 1분(60,000 밀리초)마다 updateDate 함수 실행
        const intervalId = setInterval(updateDate, 60000);

        // 컴포넌트 언마운트시 인터벌 정리
        return () => clearInterval(intervalId);
    }, []);



    const [resDetailInfo, setResDetailInfo] = useState({
        restaurantDto: {
            resNo: 0,
            resOwner: '',
            resName: '',
            resJoinDate: '',
            resUpdateDate: '',
            resOpenTime: '',
            resCloseTime: '',
            resRegion: '',
            resAddr1: '',
            resAddr2: '',
            resPost: 0,
        },
    });

    const resetSelectedDate = useResetRecoilState(selectedDateState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (resNo) {
                    const response = await getResDetail(resNo);
                    setResDetailInfo(response.data);
                }
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
            }
        };

        fetchData();
        resetSelectedDate();
    }, [resNo]);

    // 주말이면 1시간 단위로 
    // 오늘이라면 지금시간의 1시간 후 오늘이 아니면 오픈시간부터
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







    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">선택한 날짜 {formattedDate.month}월 {selectedDate.day}일</div>
                    <div className="col">
                        {/* <select className="form-select" name="" id="">
                            <option value="">인원 선택</option>
                        </select> */}
                    </div>
                    <div className="col-12">
                        <ResCarousel />
                    </div>
                </div>


                <div className="row">
                    <div className="col-12">
                        {resDetailInfo.restaurantDto.resName}
                    </div>
                    <div className="col-12">
                        {/* Display star ratings and number of reviews */}
                    </div>
                    <div className="col-12">
                        {/* Display restaurant description */}
                    </div>
                    <div className="col-4 text-center">
                        전화
                    </div>
                    <div className="col-4 text-center">
                        위치
                    </div>
                    <div className="col-4 text-center">
                        매장정보
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        예약일시
                        <div className="slot-container ">
                            {timeSlots.map((time, idx) => {
                                if (selectedDate.year === formattedDate.year &&
                                    selectedDate.month === formattedDate.month &&
                                    selectedDate.day === formattedDate.day &&
                                    time.split(":")[0] < formattedDate.time.split(":")[0] + 1) {
                                    return null;
                                }
                                return (
                                    <div className="time-slots-wrapper" key={idx}>
                                        <div className="time-slot">{time}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <ResFooter resDetailInfo={resDetailInfo} formattedDate={formattedDate} />


        </>
    );
};