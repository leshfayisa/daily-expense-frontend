import axios from 'axios';
import config from '../config';

const BASE_URL = `${config.API_BASE_URL}/expenses`;

export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        throw error;
    }
};