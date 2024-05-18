
import axiosInstance from "../utils/axiosInstance";

const messageSeenApi = async (userId) => {
    try {
      const accessToken = localStorage.getItem('access');
      const response = await axiosInstance({
       
        url: `/chat/seen/${userId}/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
      }
      });
      if (response.status === 200) {
        console.log("message seen", response.data);
        return response.data;
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

export default messageSeenApi