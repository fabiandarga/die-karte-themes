FROM node:18-alpine

WORKDIR /app

COPY ./src ./src
COPY ./build ./build
COPY package.json .
COPY package-lock.json .

ENV PORT=4005

RUN npm install

CMD  ["npm", "run", "build_and_start"]