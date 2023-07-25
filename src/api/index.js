/* eslint-disable no-debugger */
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

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