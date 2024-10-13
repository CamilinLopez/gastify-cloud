import axios from 'axios';
import Cookies from 'js-cookie'; // Para manejar cookies en el navegador
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Crear una instancia de Axios
export const axiosInstance = axios.create({
  baseURL: `${apiUrl}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
