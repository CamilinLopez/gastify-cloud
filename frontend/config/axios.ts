import axios from 'axios';
import https from 'https';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', //'https://gastify-cloud.onrender.com',
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
});
