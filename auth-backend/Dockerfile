FROM node:alpine

WORKDIR /oauth

COPY ./build/package.json ./

RUN npm i

COPY ./build ./

CMD node main.js