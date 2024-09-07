FROM node:20.11.1
WORKDIR /appfront
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npx", "next", "dev"]
