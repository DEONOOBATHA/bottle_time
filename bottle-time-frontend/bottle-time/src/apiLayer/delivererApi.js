import axiosInstance from "./axiosInstance.js";

export const getActiveOrders = async () => {
    try {
        const response = await axiosInstance.get('/api/pickup/deliverer/get_all');
        console.log('Active orders response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Get active orders error:', error);
        return [];
    }
};

export const acceptOrder = async (orderId) => {
    try {
        const response = await axiosInstance.post(`/api/pickup/deliverer/accept/id=${orderId}`);
        console.log('Accept order response:', response.data);
        return true;
    } catch (error) {
        console.error('Accept order error:', error);
        return false;
    }
};