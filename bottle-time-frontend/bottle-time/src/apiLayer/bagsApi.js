import axiosInstance from "./axiosInstance.js";

export const getBags = async () => {
    try {
        console.log('Fetching bags...');
        const response = await axiosInstance.get('/api/bags/my_bags');
        
        console.log('Bags fetch response:', {
            status: response.status,
            data: response.data
        });
        
        return response.data;
    } catch (error) {
        console.error('Fetch bags error:', error);
        return [];
    }
};

export const saveBag = async (bagData) => {
    try {
        console.log('Creating new bag...', bagData);
        
        const response = await axiosInstance.post('/api/bags/new_bag', bagData);
        
        console.log('Create bag response:', {
            status: response.status,
            data: response.data
        });
        
        return true;
    } catch (error) {
        console.error('Create bag error:', error);
        return false;
    }
};

export const updateBag = async (bagData) => {
    try {
        console.log('Updating bag...', bagData);
        
        const response = await axiosInstance.post('/api/bags/update_bag', bagData);
        
        console.log('Update bag response:', {
            status: response.status,
            data: response.data
        });
        
        return true;
    } catch (error) {
        console.error('Update bag error:', error);
        return false;
    }
};

export const deleteBag = async (bagData) => {
    try {
        console.log('Deleting bag...', bagData);
        
        const response = await axiosInstance.post('/api/bags/delete_bag', bagData);
        
        console.log('Delete bag response:', {
            status: response.status,
            data: response.data
        });
        
        return true;
    } catch (error) {
        console.error('Delete bag error:', error);
        return false;
    }
};