import axios from 'axios';
import config from '../config'
const BASE_URL = `${config.API_BASE_URL}/auth`

console.log("baseUrl", BASE_URL)

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, userData);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data.message)
        }else {
            throw new Error ("Registration failed, Please try again.");
        }
    }
};