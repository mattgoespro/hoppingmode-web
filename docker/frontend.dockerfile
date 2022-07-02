FROM node:16

WORKDIR /usr/apps/frontend

COPY package*.json .

RUN npm ci

COPY . .

CMD [ "npx", "nx", "serve", "frontend", "--configuration=production" ]

EXPOSE 4200