FROM node:16

WORKDIR /usr/apps/api

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npx nx build api

CMD [ "nx", "serve", "api" ]

EXPOSE 8080
