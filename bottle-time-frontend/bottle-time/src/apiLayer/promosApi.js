// promosApi.js
import axiosInstance from "./axiosInstance.js";

export const getMyPromos = async () => {
    try {
        console.log('Fetching promos...');
        const response = await axiosInstance.get('/api/promo/get_my_promos');
        
        console.log('Promos fetch response:', {
            status: response.status,
            data: response.data
        });
        
        return response.data;
    } catch (error) {
        console.error('Fetch promos error:', error);
        return [];
    }
};

export const buyPromo = async (promoData) => {
    try {
        console.log('Buying promo...', promoData);
        const response = await axiosInstance.post('/api/promo/buy_promo', promoData);
        
        console.log('Buy promo response:', {
            status: response.status,
            data: response.data
        });
        
        return { success: true };
    } catch (error) {
        console.error('Buy promo error:', error);
        if (error.response?.status === 400) {
            return { success: false, error: 'Insufficient balance' };
        }
        return { success: false, error: 'Failed to buy promotion' };
    }
};