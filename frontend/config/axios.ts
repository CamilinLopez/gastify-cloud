import axios from 'axios';
import Cookies from 'js-cookie'; // Para manejar cookies en el navegador
import https from 'https';

// Crear una instancia de Axios
export const axiosInstance = axios.create({
  baseURL: 'http://54.160.156.69:3001',
  // Puedes descomentar el httpsAgent si estás usando un servidor con un certificado autofirmado
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
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
