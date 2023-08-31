#syntax=docker/dockerfile:1

FROM node:16-alpine as builder

WORKDIR /app

COPY . .

RUN npm install --force && npm run build && npx nestia swagger


FROM node:16-alpine as prod

WORKDIR /app

COPY ./package*.json ./

COPY ./proto /app/proto

COPY ./src/config/database/prisma /app/src/config/database/prisma

COPY --from=builder /app/swagger.json ./

COPY --from=builder /app/dist ./dist

RUN npm install --force --omit=dev && npx prisma generate

# env는 제외
