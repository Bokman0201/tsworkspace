import axios from "axios"
export const addRestaurant = (data) => {

    axios({
        url: `${process.env.REACT_APP_REST_API_URL}/res/createRes`,
        method: 'post',
        data: data
    }).then(res => {
        if (res.status === 200) {
            return true
        } else {
            return false;
        }
    }).catch(
        console.error()
    );


}

export const restaurantList = async (keyword) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_REST_API_URL}/search/resSearch`,
            keyword
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurant data:", error);
        throw error; // Propagate the error to handle it where the function is called
    }
};


// 레스토랑 디테일 정보

export const getResDetail = async (resNo) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/res/resDetail/${resNo}`)
        return res
    } catch (e) {
        console.error(e, "error")
    }
}

export const getTables = async (resNo, capacity) => {
    try { 
        const res = await axios.get(`${process.env.REACT_APP_REST_API_URL}/res/tableStatus/${resNo}/${capacity}`)
        return res
    } catch (e) { }

}