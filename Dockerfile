FROM node:20.11-alpine

WORKDIR /myapp

COPY ./ ./

RUN npm install

CMD [ "npm","start" ]
