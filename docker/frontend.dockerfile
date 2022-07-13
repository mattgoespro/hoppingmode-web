FROM node:16 as build-step

WORKDIR /usr/apps/frontend

COPY package*.json .

RUN npm ci

COPY . .

RUN npx nx run frontend:build:production

FROM nginx:latest

COPY --from=build-step /usr/apps/frontend/dist/apps/frontend /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/

RUN nginx -t

CMD [ "nginx", "-g", "daemon off;" ]