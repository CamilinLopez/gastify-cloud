import axios from 'axios';
import https from 'https';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  httpsAgent: new https.Agent({
    // rejectUnauthorized: false,
  }),
});
