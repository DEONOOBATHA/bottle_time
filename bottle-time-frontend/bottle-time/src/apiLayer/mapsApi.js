import axiosInstance from "./axiosInstance.js";

export const getLocations = async () => {
    try {
        console.log('Fetching locations...');
        const response = await axiosInstance.get('/api/maps/my_locations');
        
        console.log('Locations fetch response:', {
            status: response.status,
            data: response.data
        });
        
        return response.data;
    } catch (error) {
        console.error('Fetch locations error:', error);
        return [];
    }
};

export const saveLocation = async (locationData) => {
    try {
        console.log('Saving location...', locationData);
        
        const response = await axiosInstance.post('/api/maps/save_location', locationData);
        
        console.log('Save location response:', {
            status: response.status,
            data: response.data
        });
        
        return true;
    } catch (error) {
        console.error('Save location error:', error);
        return false;
    }
};