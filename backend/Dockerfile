FROM node:20.11.1
WORKDIR /gastify_app
COPY package*.json .
RUN npm install
COPY . .

COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh

CMD npm start 