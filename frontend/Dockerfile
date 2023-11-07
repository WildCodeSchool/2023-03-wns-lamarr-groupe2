FROM node:14.17.3-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY public public
COPY src src

CMD npm start
