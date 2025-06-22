import axios from 'axios';
import config from '../config';

const api = axios.create({
    baseURL: config.API_BASE_URL,
});

// Intercept response errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            // remove token or user info
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Redirect manually
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;
