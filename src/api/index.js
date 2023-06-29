/* eslint-disable no-debugger */
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_DEV_URL,
  timeout: 5000,
});

apiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('auth');
        const token = process.env.VUE_APP_TEMP_TOKEN; // 임시 토큰
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;