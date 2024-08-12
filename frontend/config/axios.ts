import axios from 'axios';
import https from 'https';

export const axiosInstance = axios.create({
  baseURL: 'https://gastify-cloud.onrender.com',
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
});
