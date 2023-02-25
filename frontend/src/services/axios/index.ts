import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/'
});

api.interceptors.request.use((config: any) => {
  if (localStorage.getItem("token"))
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
});

export default api;