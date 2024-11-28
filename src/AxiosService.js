import axios from 'axios';
const AxiosService = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    "Content-Type": "application/json",
  },
});
const baseUrl = 'https://api.themoviedb.org/3'

export const publicRequest = axios.create({
    baseURL: baseUrl
})
//https://food-app-backend-f6gp.onrender.com
// AxiosService.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
//});

export default AxiosService;