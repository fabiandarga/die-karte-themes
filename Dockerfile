FROM node:18-alpine

WORKDIR /app

COPY ./src ./src
COPY ./build ./build
COPY package.json .
COPY package-lock.json .
COPY start.sh .

ENV PORT=4005
ENV ENV=prod

RUN npm install

CMD  ["./start.sh"]