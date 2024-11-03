FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install 

COPY . .

RUN npm run seed

EXPOSE 8080

CMD [ "npx", "nodemon","index.js" ]