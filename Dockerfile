FROM node:21-alpine

WORKDIR /server

COPY package*.json ./

RUN rm -rf node_modules && npm install

COPY . .

RUN npm run build

CMD ["node", "./dist/index.js"]