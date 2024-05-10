import axios from "axios";

//사용자 검색
export const clientSearch = async(text:string)=>{

    const res = await axios(`${process.env.REACT_APP_REST_API_URL}/api/search/${text}`)


    return res.data;
}