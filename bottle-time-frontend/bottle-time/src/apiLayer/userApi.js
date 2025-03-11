import { data } from "react-router-dom";
import axiosInstance from "./axiosInstance";

export const fetchMyUser = async () => {

    const response = await axiosInstance.get('/api/users/my_profile',{
        withCredentials: true, 
      });
    return response.data;
    
};