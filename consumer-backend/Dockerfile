FROM node:alpine

WORKDIR /oauth

COPY ./package.json ./

RUN npm i

COPY ./build ./

CMD node main.js