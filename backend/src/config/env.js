require('dotenv/config')


const WEBS_URL = process.env.WEBS_URL ;
const SECRET_KEY = process.env.SECRET_KEY ;
const PAGE_URL = process.env.PAGE_URL;
const CORS_ORIGIN_URL = process.env.CORS_ORIGIN_URL;

module.exports = {
  WEBS_URL,
  SECRET_KEY,
  PAGE_URL,
  CORS_ORIGIN_URL
};
