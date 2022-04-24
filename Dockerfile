#stage 1
FROM node:14.17.6 as node
WORKDIR /app
COPY . .
RUN rm /app/pagckage-lock.json
RUN npm install
#RUN npm rebuild node-sass
RUN npm run build
#stage 2
FROM nginx:alpine
COPY --from=node /app/wwwroot /usr/share/nginx/html
