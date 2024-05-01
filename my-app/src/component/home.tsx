import { NavLink } from "react-router-dom";

export const Home = ()=>{

    return(

        
        <div className="">

        <div>
            <h1>Home</h1>
        </div>
        <div >
            <NavLink to={"/login"}>login</NavLink>
        </div>
    </div>
    );
}