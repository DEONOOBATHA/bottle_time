import axiosInstance from "./axiosInstance.js";

export const orderPickup = async (bagId, locationId) => {
    try {
        console.log('Ordering pickup...', { bagId, locationId });
        
        const response = await axiosInstance.post(`/api/pickup/order/bag=${bagId}&loc=${locationId}`);
        
        console.log('Order pickup response:', {
            status: response.status,
            data: response.data
        });
        
        return true;
    } catch (error) {
        console.error('Order pickup error:', error);
        return false;
    }
};