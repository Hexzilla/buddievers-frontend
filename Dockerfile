FROM node:16.13.0-buster as builder

WORKDIR /home/node

ADD . .

RUN chown -R node:node /home/node/

USER node

ARG VUE_APP_FRONTEND_CALLBACK_URL=http://localhost:8080/auth/callback
ARG VUE_APP_BACKEND_URL=http://localhost:3001/api/v1
ARG VUE_APP_BRIDGE_URL=https://multiverse.moonsama.com/
ARG VUE_APP_BRIDGE_API_URL=https://minecraft-metaverse-api.moonsama.com/
ARG VUE_APP_BRIDGE_APP_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
RUN yarn

RUN yarn build 

FROM nginxinc/nginx-unprivileged:1.21.6-alpine

RUN sed  -i '/^    location \/ {.*/a \        try_files $uri \/index.html;' /etc/nginx/conf.d/default.conf

COPY --from=builder /home/node/dist /usr/share/nginx/html