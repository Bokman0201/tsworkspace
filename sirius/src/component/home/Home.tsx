import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home =()=>{

    const  navigator = useNavigate();

    useEffect(()=>{
        //console.log(`${process.env.REACT_APP_REST_API_URL}`)

        navigator('/')
    },[])

    return(
        <div>
        </div>
    );
}