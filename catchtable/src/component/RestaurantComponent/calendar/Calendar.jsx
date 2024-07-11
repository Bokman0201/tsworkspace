import React, { useEffect, useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, getDay, isBefore, startOfDay } from 'date-fns';
import './Calendar.css';
import { useRecoilState } from 'recoil';
import { selectedDateState } from '../../../recoil/ReservationStore';

const Calendar = ({setIsActive}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [resDate, setResDate] = useRecoilState(selectedDateState)


    


    const renderHeader = () => {
        const dateFormat = "yyyy년 M월";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <span className="month-year">{format(currentMonth, dateFormat)}</span>
                </div>
                <div className="col col-end">
                    <div className="icons">
                        <div className="icon" onClick={prevMonth}>
                            &lt;
                        </div>
                        <div className="icon" onClick={nextMonth}>
                            &gt;
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return (
            <div className="days row">
                {days.map((day, index) => (
                    <div
                        className={`col col-center ${index === 0 ? 'red-text' : (index === 6 ? 'blue-text' : '')}`} // Apply CSS classes based on index (0 for Sunday, 6 for Saturday)
                        key={index}
                    >
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const dayOfWeek = getDay(day); // Get the day of the week (0 for Sunday, 6 for Saturday)

                const isDisabled = isBefore(day, startOfDay(new Date())) || !isSameMonth(day, monthStart); // 과거 날짜이거나 현재 월과 다른 달인 경우

                days.push(
                    <div
                        className={`col cell ${isDisabled ? "disabled" : isSameDay(day, selectedDate) ? "selected" : ""
                            } ${dayOfWeek === 0 ? 'red-text' : (dayOfWeek === 6 ? 'blue-text' : '')}`} // Apply CSS classes based on day of the week and disabled status
                        key={day}
                        onClick={() => !isDisabled && onDateClick(cloneDay)} // 클릭 가능한 경우에만 onClick 이벤트 추가
                    >
                        <span className="number">{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }

        return <div className="body">{rows}</div>;
    };

    const onDateClick = day => {
        setSelectedDate(day);

        setResDate({
            year: day.getFullYear(), // 메서드 호출을 위해 () 추가
            month: String(day.getMonth() + 1).padStart(2, '0'), // 메서드 호출을 위해 () 추가, getMonth()는 0부터 시작하므로 +1 필요
            day: String(day.getDate()).padStart(2, '0') // 해당 날짜를 반환하기 위해 getDate() 사용
        });


        //  다른 캔버스 바로 열어서 오늘날짜 인원수로 예약하기
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    return (
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
};

export default Calendar;
