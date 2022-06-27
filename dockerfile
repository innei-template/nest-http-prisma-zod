FROM node:16-alpine as builder
WORKDIR /app
COPY . .
RUN apk add git make gcc g++ alpine-sdk python3 py3-pip unzip
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm bundle

FROM node:16-alpine
RUN apk add zip unzip bash --no-cache
WORKDIR /app
COPY --from=builder /app/out .
ENV TZ=Asia/Shanghai
EXPOSE 3333

CMD ["npm", "start:prod"]
