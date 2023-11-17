FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
ARG BUILD_ENV
COPY . .
COPY .env.${BUILD_ENV:-dev} ./.env
