import axiosInstance from "./axiosInstance.js";

export const getActiveOffers = async () => {
    try {
        console.log('Fetching active offers...');
        const response = await axiosInstance.get('/api/promo/get_active');
        
        console.log('Active offers response:', {
            status: response.status,
            data: response.data
        });
        
        return response.data;
    } catch (error) {
        console.error('Fetch active offers error:', error);
        return [];
    }
};