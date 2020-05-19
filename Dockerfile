FROM node:12-alpine

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

WORKDIR /app

COPY ./app/package.json ./
COPY ./app/yarn.lock ./

RUN yarn
RUN yarn cache clean

COPY ./app /app
CMD yarn run build && yarn start