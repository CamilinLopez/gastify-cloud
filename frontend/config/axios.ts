import axios from 'axios';
import https from 'https';

export const axiosInstance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});
