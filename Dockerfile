FROM node:lts-alpine3.9
WORKDIR /havoc-rest-api
RUN npm install pm2 -g
COPY package.json /havoc-rest-api
RUN npm install
COPY . /havoc-rest-api
CMD ["pm2-runtime", "ecosystem.config.js"]