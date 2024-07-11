import axios from "axios"

export const getSearchList = async (keyword) => {
    try {
        console.log("?")
      const res = await axios.post(`${process.env.REACT_APP_REST_API_URL}/search/resSearch`, { keyword });
      return  res.data;
    } catch (e) {
      console.error(e, "error");
    }
  };
  