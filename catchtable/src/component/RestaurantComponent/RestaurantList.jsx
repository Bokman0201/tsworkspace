import { useEffect, useState } from "react";
import { restaurantList } from "./RestautantFunction";
import { useNavigate } from "react-router-dom";

export const RestaurantList = () => {
    const navigator = useNavigate();
    const [info, setInfo] = useState([]);
    const [keyword, setKeyword] = useState({
        keyword: ''
    });

    const fetchdata = async () => {
        const res = await restaurantList(keyword);
        setInfo(res);
        console.log(res);
    };

    useEffect(() => {
        fetchdata();
    }, []);




    //예약 가능시간 선택 
    // 테이블 정보 가져와서 

    const moveResDetail=(resNo)=>{
        sessionStorage.setItem("resNo", resNo)
        navigator('/resDetail');
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <input type="date" />
                </div>
            </div>
            {info.length > 0 && info.map((res, index) => {
                return (
                    <div className="row mt-2" key={index}>
                        <div className="col-12">
                            {/* {res.resNo}  */}
                            <div className="" onClick={()=>moveResDetail(res.resNo)}>{res.resName}</div>
                        </div>
                        <div className="col-12">
                            {res.resOpenTime} - {res.resCloseTime}
                        </div>
 
                    </div>
                );
            })}
        </div>
    );
};

export default RestaurantList;
