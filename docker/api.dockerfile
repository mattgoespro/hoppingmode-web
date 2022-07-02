FROM node:16

WORKDIR /usr/apps/api

COPY package*.json .

RUN npm ci

COPY . .

CMD [ "npx", "nx", "serve", "api" ]

EXPOSE 8080
