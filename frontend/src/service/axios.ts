import axios from 'axios';
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResponseType {
  data: any;
  status: number;
  message: string;
}

const instance = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 10000,
  headers: {
    common: {
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
    }
  }
});

instance.interceptors.request.use(
  (config) => {
    const tokenString = sessionStorage.getItem('accessToken');
    if (tokenString) {
      config.headers = config.headers ?? {};
      config.headers['Authorization'] = `Bearer ${tokenString}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    response.data = {
      data: response.data.data,
      status: response.status,
      message: response.data.message || response.statusText
    } as ResponseType;
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.clear();
    }
    if (error.response?.data) return Promise.reject(error.response.data);
    else return Promise.reject(error);
  }
);

export default instance;
