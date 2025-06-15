import axios from 'axios';
import config from '../config'
const BASE_URL = `${config.API_BASE_URL}/auth`


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

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data; // { token, user }
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Login failed. Please try again.");
    }
  }
};
