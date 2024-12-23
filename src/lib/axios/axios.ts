import axios from 'axios';

import storage, { EStorageKey } from '@/lib/localStorage';

import { APP_CONFIG } from '@/constant/config';

const axiosInstance = axios.create({
  baseURL: APP_CONFIG.API_URL,
});

export const axiosUtils = {
  setHeader: (key: string, value: string) => {
    axiosInstance.defaults.headers.common[key] = value;
  },
  setBaseUrl: (url: string) => {
    axiosInstance.defaults.baseURL = url;
  },
  removeHeader: (key: string) => {
    delete axiosInstance.defaults.headers.common[key];
  },
};

axiosInstance.interceptors.request.use(
  (config) => {
    // Refresh token from storage on each request
    const token = storage.get(EStorageKey.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
