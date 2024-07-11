import axios from "axios"

export const requestIdDuplicate =async(clientId)=>{
    try{
        const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/client/checkDuplicate/${clientId}`);
        return res.data;
    } catch (e) {
        console.error(e , "error")
    }
}

export const requestSignUp =async(signUpInfo)=>{
    try{
        const res = await axios.post(`${process.env.REACT_APP_REST_API_URL}/client/joinClient`,signUpInfo)
        
        if(res.status ===200){
            return true;
        }else{
            return false
        }

    }catch (e){
        console.error(e , "error")
        return false;

    }
}